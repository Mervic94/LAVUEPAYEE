
export interface PaymentRequest {
  amount: number;
  currency: string;
  description: string;
  customerId: string;
  callbackUrl?: string;
}

export interface PaymentResponse {
  success: boolean;
  paymentUrl?: string;
  transactionId?: string;
  error?: string;
}

export class FedaPayService {
  private static baseUrl = 'https://api.fedapay.com/v1';
  private static publicKey = process.env.REACT_APP_FEDAPAY_PUBLIC_KEY;

  static async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      // Simulation d'appel FedaPay - À remplacer par la vraie API
      const response = await fetch(`${this.baseUrl}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.publicKey}`
        },
        body: JSON.stringify({
          amount: request.amount,
          currency: request.currency,
          description: request.description,
          customer: { id: request.customerId },
          callback_url: request.callbackUrl
        })
      });

      if (!response.ok) {
        throw new Error('Erreur création paiement');
      }

      const data = await response.json();

      return {
        success: true,
        paymentUrl: data.payment_url,
        transactionId: data.id
      };
    } catch (error) {
      console.error('Erreur FedaPay:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  static async verifyPayment(transactionId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/transactions/${transactionId}`, {
        headers: {
          'Authorization': `Bearer ${this.publicKey}`
        }
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      return data.status === 'approved';
    } catch (error) {
      console.error('Erreur vérification paiement:', error);
      return false;
    }
  }
}
