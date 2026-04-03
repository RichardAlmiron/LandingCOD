import { CartItem, OrderFormData } from '@/lib/types';

interface WhatsAppOrderData extends OrderFormData {
  storeName: string;
}

export function generateWhatsAppMessage(data: WhatsAppOrderData): string {
  const { storeName, firstName, lastName, phone, city, neighborhood, address, 
          locationUrl, referencePoints, products, total } = data;

  const date = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Format products list
  const productsList = products.map((item, index) => {
    const price = item.discount 
      ? item.price * (1 - item.discount / 100)
      : item.price;
    const totalItem = price * item.quantity;
    
    return `${index + 1}. *${item.title}*
   Cantidad: ${item.quantity}
   Precio unitario: $${price.toFixed(2)}
   Subtotal: $${totalItem.toFixed(2)}`;
  }).join('\n\n');

  const message = `🛍️ *NUEVO PEDIDO - ${storeName.toUpperCase()}*

📅 *Fecha:* ${date}

━━━━━━━━━━━━━━━━━━━━━━━
👤 *DATOS DEL CLIENTE*
━━━━━━━━━━━━━━━━━━━━━━━
*Nombre:* ${firstName} ${lastName}
*Teléfono:* ${phone}

━━━━━━━━━━━━━━━━━━━━━━━
📍 *DIRECCIÓN DE ENTREGA*
━━━━━━━━━━━━━━━━━━━━━━━
*Ciudad:* ${city}
*Barrio:* ${neighborhood}
*Dirección:* ${address}
${referencePoints ? `*Referencias:* ${referencePoints}` : ''}
${locationUrl ? `\n📍 *Ubicación GPS:* ${locationUrl}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━
🛒 *PRODUCTOS*
━━━━━━━━━━━━━━━━━━━━━━━
${productsList}

━━━━━━━━━━━━━━━━━━━━━━━
💰 *TOTAL A PAGAR*
━━━━━━━━━━━━━━━━━━━━━━━
*Total: $${total.toFixed(2)}*
💵 *Método de pago:* Cash on Delivery (Pago contra entrega)

━━━━━━━━━━━━━━━━━━━━━━━
✅ *CONFIRMACIÓN*
━━━━━━━━━━━━━━━━━━━━━━━
Por favor, confirme la recepción de este pedido.

¡Gracias por su compra! 🎉`;

  return message;
}

export function sendWhatsAppOrder(whatsappNumber: string, message: string): void {
  // Clean the phone number (remove spaces, +, etc.)
  const cleanNumber = whatsappNumber.replace(/\D/g, '');
  
  // Encode the message
  const encodedMessage = encodeURIComponent(message);
  
  // Generate WhatsApp URL
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
  
  // Open in new tab
  window.open(whatsappUrl, '_blank');
}

export function handleOrderSubmission(
  formData: OrderFormData,
  storeName: string,
  whatsappNumber: string,
  onSuccess?: () => void
): void {
  const messageData: WhatsAppOrderData = {
    ...formData,
    storeName
  };
  
  const message = generateWhatsAppMessage(messageData);
  sendWhatsAppOrder(whatsappNumber, message);
  
  if (onSuccess) {
    onSuccess();
  }
}
