# Testkopie nur im Arbeitsspeicher: eine fehlende Wartebedingung ergänzen.
import sys,inspect
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[4]/'quellen'))
import community_moderation_test as m
src=inspect.getsource(m.main)
src=src.replace('            pruefe(s.get_by_text("Telefonnummer im Text").count() == 1,', '            s.get_by_text("Telefonnummer im Text", exact=True).wait_for()\n            pruefe(s.get_by_text("Telefonnummer im Text").count() == 1,')
exec(compile(src,'<Review: Moderation mit Wartebedingung>','exec'),m.__dict__)
sys.exit(m.main())
