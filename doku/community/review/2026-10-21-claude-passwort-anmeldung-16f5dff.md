# Bericht · Spec 08 Passwortanmeldung umgesetzt (`16f5dff`)

> 21.10.2026 · Claude · Umsetzung · Branch `community-zugang` @ `16f5dff` · `main` unverändert (`e4a4210`)
> Vorgänger: ChatGPT, Spec 08 @ `4889779`. Technikplan: [08-technik-plan-passwort.md](../08-technik-plan-passwort.md).

## Umfang

- **Anmelden (Standard):** E-Mail + Passwort, „Passwort anzeigen“, „Passwort vergessen?“, „Konto erstellen“, „Bisher nur per E-Mail angemeldet? Passwort festlegen“, „Alternativ per E-Mail anmelden“, „Ohne Anmeldung weiterlernen“. Nur `signInWithPassword`.
- **Konto erstellen** mit Wiederholung und gelesener Mindestlänge (6); Bestätigungsansicht mit Spec-Text, „Bestätigungs-Mail erneut senden“.
- **Passwort vergessen / festlegen** über dieselbe Wiederherstellung des bestehenden Kontos, neutraler Versandtext, optional Code aus der Mail.
- **Neues Passwort festlegen** nur nach `PASSWORD_RECOVERY` für genau das Konto der Sitzung, vor Profil-/Ziel-/Paketprüfung, auch nach Reload im Tab.
- **Profil → Passwort festlegen oder ändern** (dieselbe ID); Reauthentifizierungscode, falls Supabase ihn verlangt.
- Mail-Link/Code bleibt untergeordnet, jetzt mit `shouldCreateUser: false` und neutralem Text.
- Profilanlage: „Schon mit einem anderen Konto registriert? Melde dich ab und mit dessen E-Mail-Adresse an.“ + Abmelden.
- Datenschutztext („Anmeldung erfolgt über einen E-Mail-Link …“) korrigiert. Keine SQL-Migration, keine Auth-Einstellung geändert, Paket bleibt zu.

## Testbelege (getrennt)

| Art | Ergebnis |
|---|---|
| **Simulation** `community_passwort_test.py` (echte Module, nachgebildete Auth nach supabase-js 2.117.3) | **115/115** – P01–P18: neutrale Fehler, kein Mail-Fallback/keine Anlage bei falschem Login, kein trim, Doppelklick, Anzeigen/Verbergen (Wert/Fokus/Auswahl), Felder geleert beim Wechsel, kein Passwort in Speicher/Konsole, Registrierung inkl. vorhandener Adresse und Serverregel 8, Vergessen/Festlegen neutral ohne signUp, Recovery-Code, Recovery-Link + Reload + Speichern, anderer Browser/abgelaufen/Parameter allein, Sitzung A + Link B (nur B geändert, Lernstand-Merkzettel bei B), verspätete Antwort nach Kontowechsel, unklare Antwort, Reauthentifizierung, Mail-Rückfall, Profilanlage, geschlossenes Paket, offline, 320 px, axe (7 Ansichten) |
| Simulation, bestehende Suites | Korrekturen 97/97, Bilder 84/84, Gruppen 47/47, Moderation 128/128, Lernstand-Sync 90/90 |
| Lokal | `funktionstest.py` 269/269, `lernkern_audit_test.py` ok, `pruefe.py --schnell` ohne Fehler, Build ok |
| **Echte Auth** | Nur gelesen: Settings + eine Signup-Probe (Mindestlänge 6, kein Konto angelegt). **Kein** echter Login/Registrierung/Recovery/Passwortsetzen – kein freigegebenes Testkonto mit Passwort in dieser Sitzung. |
| **Mailversand** | **nicht geprüft** (Brevo offen; Standardversand erreicht nur Team-Adressen). |
| **Handy/PWA** | **nicht geprüft.** Erwartung laut Bibliothek: Recovery-Link aus der installierten App öffnet oft den Browser → ohne Prüfwert ungültig; dafür Code in der Vorlage nötig. |
| Live-Tests `community_zugang_test.py`, `community_test.py` | an neuen Standard angepasst (Mail-Weg über „Alternativ …“), **nicht gelaufen**. |

## Offen / für Lukes

1. Dashboard: Redirect-URLs mit `**` (neue Parameter `zweck=…`), Reset-Vorlage mit `{{ .Token }}`, Secure-Password-Change-Stand nennen; „Aktuelles Passwort verlangen“ bitte aus lassen (Technikplan §1–2).
2. Für echte Abnahme: ein eigenes Testkonto mit Mailzugang (Bestandskonto ohne Passwort nachrüsten, danach Login; Registrierung; Vergessen; Reauthentifizierung) – Zugangsdaten nicht ins Repo.
3. SMTP/Brevo vor Klasseneinsatz.
4. Merge/Deployment und Paketöffnung: jeweils gesonderte Freigabe.
