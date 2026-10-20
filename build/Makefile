.PHONY: setup dev api web test

setup:
	cd agent && uv sync
	cd web && pnpm install

api:
	cd agent && PYTHONPATH=. uv run uvicorn sawa.app:app --port 8000 --reload

web:
	cd web && SAWA_API_ORIGIN=http://127.0.0.1:8000 pnpm dev --port 3100

dev:
	$(MAKE) -j2 api web

test:
	cd agent && uv run pytest -q --cov=sawa
	cd web && pnpm exec tsc --noEmit && pnpm exec eslint app components/sawa lib
