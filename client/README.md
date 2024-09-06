# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

## Commands to run

- npm run dev

- Loguear en modo incognito
- Poner pagar con tarjeta
- Mastercard 5031 7557 3453 0604 $$ 123 $$ 11/25
- Pagar en 2 cuotas

## Respuesta

POST /api/mp/webhook?data.id=1326584027&type=payment
{
  action: 'payment.created',
  api_version: 'v1',
  data: { id: '1326584027' },
  date_created: '2024-09-05T04:35:27Z',
  id: 115622282195,
  live_mode: false,
  type: 'payment',
  user_id: '54527027'
}

<http://localhost:5173/success?collection_id=1319454466&collection_status=approved&payment_id=1319454466&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=22492095764&preference_id=54527027-2031aa8e-7899-478b-9173-1d11e43ded69&site_id=MLA&processing_mode=aggregator&merchant_account_id=null>
