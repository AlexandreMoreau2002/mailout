const nodemailer = require("nodemailer");
const dayjs = require("dayjs");
const fs = require("fs");
const { simpleParser } = require("mailparser");

const transporter = nodemailer.createTransport({
  // RD 10.33.4.34 | rd-ganesh.xefi.fr | 25
  // RC 10.33.4.33(58) | rc-ganesh.xefi.fr | 25 
  // RC 10.33.4.57 | demo-ganesh.xefi.fr | 25
  // RC localhost | 1025
  host: '10.33.4.34',
  port: 25
});

async function main() {
  try {
    // Vérifier si un argument de nom de fichier a été fourni
    const args = process.argv.slice(2);
    if (args.length === 0) {
      console.error("Veuillez fournir le nom du fichier .eml sans extension en argument.");
      process.exit(1);
    }

    // Récupérer le nom du fichier sans extension
    const fileName = args[0];

    // Lire le contenu du fichier .eml
    const emlContent = fs.readFileSync(fileName, "utf8");

    // Utiliser mailparser pour analyser le contenu du fichier .eml
    const parsedEmail = await simpleParser(emlContent);

    // Extraire les informations nécessaires pour l'envoi de l'email
    const from = parsedEmail.from.text || 'me@you.com';
    const to = parsedEmail.to.text || 'ludie@rubis.com';
    const subject = `${parsedEmail.subject || 'No Subject'} - ${dayjs().format("YYYYMMDDTHHmmss")}`;
    const text = parsedEmail.text || '';
    const html = parsedEmail.html || '';
    const attachments = parsedEmail.attachments.map(attachment => ({
      filename: attachment.filename,
      content: attachment.content,
      contentType: attachment.contentType,
      cid: attachment.cid // Identifiant de contenu pour les images intégrées dans le HTML
    }));

    // Envoyer l'email avec nodemailer
    const info = await transporter.sendMail({
      from, // Adresse d'expéditeur dans le fichier EML
      to, // Destinataires dans le fichier EML
      subject, // Sujet de l'email
      text, // Corps de texte de l'email
      html, // Corps HTML de l'email
      attachments // Pièces jointes extraites du fichier EML
    });

    console.log('Email envoyé avec succès:', info.messageId);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
  }
}

main().catch(console.error);