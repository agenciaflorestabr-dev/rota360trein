

## Desativar Boleto no Checkout do Mercado Pago

### O que muda
No edge function `mercadopago-create/index.ts`, adicionar a exclusão do boleto bancário na configuração `payment_methods` da preferência.

### Alteração técnica

**Arquivo:** `supabase/functions/mercadopago-create/index.ts`

Alterar o bloco `payment_methods` de:
```json
{ "installments": 10 }
```
Para:
```json
{
  "installments": 10,
  "excluded_payment_types": [
    { "id": "ticket" }
  ]
}
```

O tipo `ticket` no Mercado Pago corresponde a Boleto Bancário e pagamentos em lotérica. Isso remove essas opções do checkout, mantendo Pix, cartão de crédito e débito.

