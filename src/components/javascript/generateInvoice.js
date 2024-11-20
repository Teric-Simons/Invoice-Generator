import { jsPDF } from "jspdf";
import "jspdf-autotable";

export function generateInvoice(formData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  if (formData.Logo) {
    doc.addImage(formData.Logo, "JPEG", 0, -15, 100, 100);
  }

  // Add Invoice Number
  doc.text(formData.InvoiceNumber, pageWidth - 60, 25);
  doc.setFontSize(14);
  doc.text(`Invoice Number: ${formData.InvoiceNumber}`, 10, 90);

  // Add Purchase Order
  doc.text(`Purchase Order: ${formData.PurchaseOrder}`, 10, 100);

  // Add Company Details
  doc.text(`Company Details: ${formData.CompanyDetails}`, 10, 110);

  // Add Bill To
  doc.text(`Bill To: ${formData.BillTo}`, 10, 120);

  // Add Currency
  doc.text(`Currency: ${formData.Currency}`, 10, 130);

  // Add Invoice Date
  doc.text(`Invoice Date: ${formData.InvoiceDate}`, 10, 140);

  // Add Due Date
  doc.text(`Due Date: ${formData.DueDate}`, 10, 150);
  // Add Items Table
  const items = formData.items.map((item) => [
    item.description,
    item.unitCost,
    item.quantity,
    item.amount,
  ]);

  doc.autoTable({
    head: [["Description", "Unit Cost", "Quantity", "Amount"]],
    body: items,
    startY: 160,
  });

  doc.setFont("Helvetica", "bold"); // Set the font to bold
  doc.setFontSize(32); // Set the font size to 16
  doc.text("INVOICE", pageWidth - 60, 15);

  // Save the PDF
  doc.save("invoice.pdf");
}
