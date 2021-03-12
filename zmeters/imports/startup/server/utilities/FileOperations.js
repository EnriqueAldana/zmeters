import mimetypes from 'mimetypes';
import Utilities from "./Utilities";
import { BASE_URL_STORAGE , firebaseAdminsStorage} from "../services/FirebaseAdmin";
import {ResponseMessage} from "./ResponseMesssage";

export default {
    async saveFileFromBufferToGoogleStorage(fileBuffer, name, path ,mimeType) {
        const responseMessage = new ResponseMessage();
        const filename = `${ name }${ Utilities.generateNumberToken(10.99) }.${ mimetypes.detectExtension(mimeType) }`;
        const file = firebaseAdminsStorage.file(`${ path}/${ filename}`);
        const fileUrl = `${ BASE_URL_STORAGE }/${ firebaseAdminsStorage.name }/${ path }/${ filename }`;
        try{
                await file.save(fileBuffer,{
                    metadata: {
                        contentType: mimeType
                    },
                    public: true
                });
                responseMessage.create('File uploaded',null,{success: true, fileUrl});

        }catch(exception){
            console.error('Error uploading file to Google Storage: ', exception);
            responseMessage.create('Error uploading file to Google Storage',null,{success: false});
        }
        return responseMessage;
    },
    async saveFileFromBase64ToGoogleStorage(base64file,name,path){
        const mimeType = base64file.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];
        const base64EncodedImageString= base64file.split(';base64,').pop();
        const fileBuffer= Buffer.from(base64EncodedImageString,'base64');
        return await this.saveFileFromBufferToGoogleStorage(fileBuffer,name,path,mimeType);
    }
}
