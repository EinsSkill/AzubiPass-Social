-- AzubiPass Social · Bilder im Feed (Spec 07), Teil 2: Anhänge prüfen (intern).
-- Sperrt alle Speicherobjekte in fester Reihenfolge (nach Name, G06) und prüft dann
-- Pfad, Format, Größe und Kombination. Art/Größe kommen aus storage.objects, nicht vom Client.
-- Ergebnis: geordnete Liste [{pos, pfad, art, groesse, beschreibung}]. Kein Ausführrecht für Konten.
create function public.anhaenge_pruefen(p_konto uuid, p_vorgang uuid, p_art text, p_anhaenge jsonb)
returns jsonb
language plpgsql set search_path = '' as $$
declare
  a jsonb := coalesce(p_anhaenge, '[]'::jsonb);
  n int; z record;
  bilder int := 0; pdfs int := 0; summe bigint := 0;
  liste jsonb := '[]'::jsonb;
begin
  if jsonb_typeof(a) <> 'array' then raise exception 'Die Anhänge sind ungültig.'; end if;
  n := jsonb_array_length(a);
  if n > 5 then raise exception 'Du kannst höchstens 5 Bilder hinzufügen.'; end if;
  for z in
    select e.wert->>'pfad' as pfad, coalesce(e.wert->>'beschreibung', '') as beschreibung
      from jsonb_array_elements(a) as e(wert) order by e.wert->>'pfad'
  loop
    if z.pfad is null or z.pfad !~ ('^' || p_konto::text || '/' || p_vorgang::text || '-[1-5]\.(jpg|png|webp|pdf)$') then
      raise exception 'Die Datei gehört nicht zu diesem Beitrag.';
    end if;
    if char_length(btrim(z.beschreibung)) > 200 then
      raise exception 'Eine Bildbeschreibung darf höchstens 200 Zeichen lang sein.';
    end if;
    perform 1 from storage.objects o where o.bucket_id = 'lernzettel' and o.name = z.pfad for share;
    if not found then raise exception 'Die Datei ist nicht hochgeladen.'; end if;
  end loop;
  for z in
    select e.ord::int as pos, e.wert->>'pfad' as pfad, btrim(coalesce(e.wert->>'beschreibung', '')) as beschreibung,
           o.metadata->>'mimetype' as mime, coalesce((o.metadata->>'size')::bigint, 0) as groesse
      from jsonb_array_elements(a) with ordinality as e(wert, ord)
      join storage.objects o on o.bucket_id = 'lernzettel' and o.name = e.wert->>'pfad'
     order by e.ord
  loop
    if z.groesse < 1 or z.groesse > 5242880 then raise exception 'Dieses Bild ist größer als 5 MiB.'; end if;
    if z.mime in ('image/jpeg', 'image/png', 'image/webp') then bilder := bilder + 1;
    elsif z.mime = 'application/pdf' then pdfs := pdfs + 1;
    else raise exception 'Dieses Bildformat wird nicht unterstützt. Wähle JPG, PNG oder WebP.'; end if;
    summe := summe + z.groesse;
    liste := liste || jsonb_build_object('pos', z.pos, 'pfad', z.pfad, 'beschreibung', z.beschreibung,
                                         'art', case when z.mime = 'application/pdf' then 'pdf' else 'bild' end,
                                         'groesse', z.groesse);
  end loop;
  if jsonb_array_length(liste) <> n then raise exception 'Die Datei ist nicht hochgeladen.'; end if;
  if summe > 26214400 then raise exception 'Alle Bilder zusammen dürfen höchstens 25 MiB groß sein.'; end if;
  if pdfs > 0 and (p_art <> 'lernzettel' or pdfs <> 1 or bilder > 0) then
    raise exception 'Ein PDF gibt es nur als einzelnen Anhang eines Lernzettels.';
  end if;
  if p_art = 'lernzettel' and n = 0 then raise exception 'Ein Lernzettel braucht Bilder oder ein PDF.'; end if;
  return liste;
end $$;

revoke all on function public.anhaenge_pruefen(uuid, uuid, text, jsonb) from public, anon, authenticated;
