# HG Autos

Site institucional em arquivo único (`index.html`). Seminovos: compra, venda, troca, consignação e financiamento. Rua Caraipé das Águas, 1041, Jardim dos Ipês. Fone (11) 2597-8690, zap (11) 94029-5495.

Produção: https://hg-autos-production.up.railway.app

Deploy: Railway, projeto `hg-autos`, serviço ligado ao repo com Dockerfile nginx na porta 8080.

```powershell
python -m http.server 8000
```

Verificação da jornada: `node --test evals/journey.test.mjs`.

O formulário abre o WhatsApp com a mensagem preenchida. A pessoa ainda precisa enviar a mensagem. O catálogo mostra categorias, sem estoque sincronizado, e a simulação de financiamento depende do atendimento humano.
