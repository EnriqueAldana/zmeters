if(Meteor.isDevelopment){
    if(Meteor.settings.private?.SENDER_EMAILS){
        process.env.EMAIL_SERVICES= Meteor.settings.private.SENDER_EMAILS.CONTACT;
    }else{
        console.warn("El servicio de envio de correos no ha sido configurado , por lo que no se enviarán correos.");
    }
}


const name = 'Sistema ZMeters';
const email = `<${process.env.EMAIL_SERVICES}>`;
const from = `${ name } ${ email}`;

const emailEnrollAccount = 'email_enroll_account.html';
const productSrc = 'http://localhost:3000/img/vue-meteor.png';
const logoSrc = 'http://localhost:3000/img/Powered.png';

Accounts.emailTemplates.siteName = name;
Accounts.emailTemplates.from = from;
const emailTemplates = Accounts.emailTemplates;

emailTemplates.emailEnrollAccount = {
    subject() {
        return `Bienvenido a ${name}`;
    },
    html(user,url) {
        const urlWithoutHash = url.replace('#/','');
        if(Meteor.isDevelopment) {
            console.info('Inicializacion del link para password',urlWithoutHash);
        }
        SSR.compileTemplate('emailEnrollAccount',Assets.getText(emailEnrollAccount));
        return SSR.render('emailEnrollAccount',{
            urlWithoutHash,
            productSrc,
            logoSrc
        });
    }
};

if(Meteor.isDevelopment){
    if(Meteor.settings.private?.MAIL_URL){
        process.env.MAIL_URL= Meteor.settings.private.MAIL_URL;
    }else{
        console.warn("El servicio de envio de correos no ha sido configurado , por lo que no se enviarán correos.");
    }
}