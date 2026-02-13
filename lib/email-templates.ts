export interface BookingEmailData {
  guestName: string;
  cabinName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  basePrice: number;
  cleaningFee: number;
  serviceFee: number;
  total: number;
  language: 'en' | 'ro';
  bookingReference?: string;
  isPendingPayment?: boolean;
}

export function getBookingConfirmationEmail(data: BookingEmailData) {
  const {
    guestName,
    cabinName,
    checkIn,
    checkOut,
    guests,
    nights,
    basePrice,
    cleaningFee,
    serviceFee,
    total,
    language,
  } = data;

  const content = {
    en: {
      subject: `Booking Confirmation - ${cabinName}`,
      greeting: `Dear ${guestName},`,
      intro: `Thank you for booking with The A-Frame! We're excited to host you in Azuga, Romania.`,
      confirmationTitle: 'Your Booking Details',
      cabin: 'Cabin',
      checkInDate: 'Check-in',
      checkOutDate: 'Check-out',
      numberOfGuests: 'Guests',
      numberOfNights: 'Nights',
      priceBreakdown: 'Price Breakdown',
      basePriceLabel: 'Base Price',
      cleaningFeeLabel: 'Cleaning Fee',
      serviceFeeLabel: 'Service Fee',
      totalLabel: data.isPendingPayment ? 'Total Due' : 'Total Paid',
      paymentInstructions: 'Payment Instructions',
      paymentIntro: 'To confirm your booking, please transfer the payment using Wise:',
      accountName: 'Account Name',
      accountEmail: 'Wise Email',
      transferAmount: 'Amount to Transfer',
      importantNote: 'Important',
      referenceNote: `Please include your booking reference "${data.bookingReference}" in the transfer description.`,
      paymentSteps: 'How to Pay',
      step1: 'Open your Wise app or visit wise.com',
      step2: `Send ${total.toFixed(2)} RON to: info@aframe-azuga.ro`,
      step3: `Include reference: ${data.bookingReference}`,
      step4: 'We will confirm within 24 hours after receiving payment',
      checkInInfo: 'Check-in Information',
      checkInTime: 'Check-in time: 3:00 PM',
      checkOutTime: 'Check-out time: 11:00 AM',
      location: 'Location: Azuga, Prahova County, Carpathian Mountains, Romania',
      directions: 'From Bucharest: Take DN1 through Sinaia and Bușteni (approximately 2.5 hours)',
      whatToBring: 'What to Bring',
      bringList: '• Valid ID for check-in<br>• Comfortable hiking shoes<br>• Warm layers (mountain weather can change quickly)<br>• Any personal toiletries',
      needHelp: 'Need Help?',
      contactInfo: 'If you have any questions or need to make changes to your booking, please contact us at:',
      email: 'Email: info@aframe-azuga.ro',
      phone: 'Phone: +40 123 456 789',
      lookingForward: 'We look forward to welcoming you to the Carpathian Mountains!',
      signature: 'Best regards,<br>The A-Frame Team<br>Azuga, Romania',
    },
    ro: {
      subject: `Confirmare Rezervare - ${cabinName}`,
      greeting: `Dragă ${guestName},`,
      intro: `Mulțumim că ai rezervat la The A-Frame! Suntem încântați să te găzduim în Azuga, România.`,
      confirmationTitle: 'Detaliile Rezervării Tale',
      cabin: 'Cabană',
      checkInDate: 'Check-in',
      checkOutDate: 'Check-out',
      numberOfGuests: 'Oaspeți',
      numberOfNights: 'Nopți',
      priceBreakdown: 'Detalii Preț',
      basePriceLabel: 'Preț de Bază',
      cleaningFeeLabel: 'Taxă Curățenie',
      serviceFeeLabel: 'Taxă Serviciu',
      totalLabel: data.isPendingPayment ? 'Total de Plată' : 'Total Plătit',
      paymentInstructions: 'Instrucțiuni de Plată',
      paymentIntro: 'Pentru a confirma rezervarea, te rugăm să transferi plata folosind Wise:',
      accountName: 'Nume Cont',
      accountEmail: 'Email Wise',
      transferAmount: 'Sumă de Transferat',
      importantNote: 'Important',
      referenceNote: `Te rugăm să incluzi referința de rezervare "${data.bookingReference}" în descrierea transferului.`,
      paymentSteps: 'Cum să Plătești',
      step1: 'Deschide aplicația Wise sau vizitează wise.com',
      step2: `Trimite ${total.toFixed(2)} RON la: info@aframe-azuga.ro`,
      step3: `Include referință: ${data.bookingReference}`,
      step4: 'Vom confirma în 24 de ore după primirea plății',
      checkInInfo: 'Informații Check-in',
      checkInTime: 'Ora check-in: 15:00',
      checkOutTime: 'Ora check-out: 11:00',
      location: 'Locație: Azuga, Județul Prahova, Munții Carpați, România',
      directions: 'Din București: Ia DN1 prin Sinaia și Bușteni (aproximativ 2.5 ore)',
      whatToBring: 'Ce Să Aduci',
      bringList: '• Buletin/carte de identitate pentru check-in<br>• Încălțăminte confortabilă pentru drumeții<br>• Îmbrăcăminte călduroasă (vremea montană se poate schimba rapid)<br>• Produse de igienă personală',
      needHelp: 'Ai Nevoie de Ajutor?',
      contactInfo: 'Dacă ai întrebări sau vrei să faci modificări la rezervare, contactează-ne la:',
      email: 'Email: info@aframe-azuga.ro',
      phone: 'Telefon: +40 123 456 789',
      lookingForward: 'Abia așteptăm să te întâmpinăm în Munții Carpați!',
      signature: 'Cu drag,<br>Echipa The A-Frame<br>Azuga, România',
    },
  };

  const t = content[language];

  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'en'
      ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('ro-RO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const html = `
<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #FAF7F0; color: #3D3228;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAF7F0; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2D4B3C 0%, #4A7057 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #FAF7F0; font-size: 32px; font-weight: 700; font-family: 'Playfair Display', Georgia, serif;">
                The A-Frame
              </h1>
              <p style="margin: 10px 0 0; color: #E8DCC8; font-size: 14px;">
                Azuga, Carpathian Mountains
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">

              <!-- Greeting -->
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6;">
                ${t.greeting}
              </p>
              <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6;">
                ${t.intro}
              </p>

              <!-- Booking Details Card -->
              <div style="background-color: #F5F1E8; border-left: 4px solid #2D4B3C; padding: 24px; margin-bottom: 30px; border-radius: 8px;">
                <h2 style="margin: 0 0 20px; color: #2D4B3C; font-size: 20px; font-weight: 700;">
                  ${t.confirmationTitle}
                </h2>

                <table width="100%" cellpadding="8" cellspacing="0">
                  <tr>
                    <td style="font-weight: 600; color: #5D4E37; width: 40%;">${t.cabin}:</td>
                    <td style="color: #3D3228;">${cabinName}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: 600; color: #5D4E37;">${t.checkInDate}:</td>
                    <td style="color: #3D3228;">${formatDate(checkIn)}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: 600; color: #5D4E37;">${t.checkOutDate}:</td>
                    <td style="color: #3D3228;">${formatDate(checkOut)}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: 600; color: #5D4E37;">${t.numberOfGuests}:</td>
                    <td style="color: #3D3228;">${guests}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: 600; color: #5D4E37;">${t.numberOfNights}:</td>
                    <td style="color: #3D3228;">${nights}</td>
                  </tr>
                </table>
              </div>

              <!-- Price Breakdown -->
              <div style="background-color: #FAF7F0; padding: 24px; margin-bottom: 30px; border-radius: 8px;">
                <h3 style="margin: 0 0 16px; color: #2D4B3C; font-size: 18px; font-weight: 700;">
                  ${t.priceBreakdown}
                </h3>

                <table width="100%" cellpadding="8" cellspacing="0">
                  <tr>
                    <td style="color: #3D3228;">${t.basePriceLabel}:</td>
                    <td style="text-align: right; color: #3D3228;">${basePrice.toFixed(2)} RON</td>
                  </tr>
                  <tr>
                    <td style="color: #3D3228;">${t.cleaningFeeLabel}:</td>
                    <td style="text-align: right; color: #3D3228;">${cleaningFee.toFixed(2)} RON</td>
                  </tr>
                  <tr>
                    <td style="color: #3D3228;">${t.serviceFeeLabel}:</td>
                    <td style="text-align: right; color: #3D3228;">${serviceFee.toFixed(2)} RON</td>
                  </tr>
                  <tr style="border-top: 2px solid #E8DCC8;">
                    <td style="font-weight: 700; color: #2D4B3C; padding-top: 12px;">${t.totalLabel}:</td>
                    <td style="text-align: right; font-weight: 700; color: #2D4B3C; padding-top: 12px; font-size: 18px;">${total.toFixed(2)} RON</td>
                  </tr>
                </table>
              </div>

              ${data.isPendingPayment ? `
              <!-- Payment Instructions -->
              <div style="background-color: #FFF4E6; border-left: 4px solid #FF9800; padding: 24px; margin-bottom: 30px; border-radius: 8px;">
                <h3 style="margin: 0 0 16px; color: #2D4B3C; font-size: 18px; font-weight: 700;">
                  🏦 ${t.paymentInstructions}
                </h3>
                <p style="margin: 0 0 16px; font-size: 14px; line-height: 1.6; color: #3D3228;">
                  ${t.paymentIntro}
                </p>

                <div style="background-color: #FFFFFF; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                  <table width="100%" cellpadding="6" cellspacing="0">
                    <tr>
                      <td style="font-weight: 600; color: #5D4E37; width: 40%;">${t.accountName}:</td>
                      <td style="color: #3D3228; font-weight: 600;">The A-Frame Azuga</td>
                    </tr>
                    <tr>
                      <td style="font-weight: 600; color: #5D4E37;">${t.accountEmail}:</td>
                      <td style="color: #3D3228; font-weight: 600;">info@aframe-azuga.ro</td>
                    </tr>
                    <tr style="border-top: 2px solid #F5F1E8;">
                      <td style="font-weight: 700; color: #2D4B3C; padding-top: 12px;">${t.transferAmount}:</td>
                      <td style="color: #FF9800; font-weight: 700; padding-top: 12px; font-size: 18px;">${total.toFixed(2)} RON</td>
                    </tr>
                  </table>
                </div>

                <div style="background-color: #FFF9C4; border: 2px solid #FBC02D; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
                  <p style="margin: 0; font-size: 13px; color: #7D6608; font-weight: 600;">
                    ⚠️ ${t.importantNote}: ${t.referenceNote}
                  </p>
                </div>

                <div style="margin-top: 16px;">
                  <p style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #2D4B3C;">${t.paymentSteps}:</p>
                  <ol style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #3D3228;">
                    <li>${t.step1}</li>
                    <li>${t.step2}</li>
                    <li>${t.step3}</li>
                    <li>${t.step4}</li>
                  </ol>
                </div>
              </div>
              ` : ''}

              <!-- Check-in Information -->
              <div style="margin-bottom: 30px;">
                <h3 style="margin: 0 0 16px; color: #2D4B3C; font-size: 18px; font-weight: 700;">
                  ${t.checkInInfo}
                </h3>
                <p style="margin: 0 0 8px; font-size: 14px; line-height: 1.6; color: #3D3228;">
                  ✓ ${t.checkInTime}
                </p>
                <p style="margin: 0 0 8px; font-size: 14px; line-height: 1.6; color: #3D3228;">
                  ✓ ${t.checkOutTime}
                </p>
                <p style="margin: 0 0 8px; font-size: 14px; line-height: 1.6; color: #3D3228;">
                  ✓ ${t.location}
                </p>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #3D3228;">
                  ✓ ${t.directions}
                </p>
              </div>

              <!-- What to Bring -->
              <div style="margin-bottom: 30px;">
                <h3 style="margin: 0 0 16px; color: #2D4B3C; font-size: 18px; font-weight: 700;">
                  ${t.whatToBring}
                </h3>
                <p style="margin: 0; font-size: 14px; line-height: 1.8; color: #3D3228;">
                  ${t.bringList}
                </p>
              </div>

              <!-- Contact Information -->
              <div style="background-color: #F5F1E8; padding: 24px; border-radius: 8px; margin-bottom: 30px;">
                <h3 style="margin: 0 0 12px; color: #2D4B3C; font-size: 18px; font-weight: 700;">
                  ${t.needHelp}
                </h3>
                <p style="margin: 0 0 12px; font-size: 14px; line-height: 1.6; color: #3D3228;">
                  ${t.contactInfo}
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #3D3228;">
                  📧 ${t.email}
                </p>
                <p style="margin: 0; font-size: 14px; color: #3D3228;">
                  📱 ${t.phone}
                </p>
              </div>

              <!-- Closing -->
              <p style="margin: 0 0 10px; font-size: 16px; line-height: 1.6; color: #3D3228;">
                ${t.lookingForward}
              </p>
              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #3D3228;">
                ${t.signature}
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F5F1E8; padding: 20px 30px; text-align: center; border-top: 1px solid #E8DCC8;">
              <p style="margin: 0; font-size: 12px; color: #5D4E37; line-height: 1.5;">
                © ${new Date().getFullYear()} The A-Frame Azuga. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  return {
    subject: t.subject,
    html,
  };
}
