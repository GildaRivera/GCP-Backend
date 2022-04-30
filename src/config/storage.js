const {Storage} = require('@google-cloud/storage')
const path = require('path')

const GCLOUD_PROJECT_ID = process.env.GCLOUD_PROJECT_ID


const GCLOUD_PROJECT_KEYFILE = path.join(__dirname,`./${process.env.BUCKET_KEYFILE}`)


const storage = new Storage({
    keyFilename:GCLOUD_PROJECT_KEYFILE,
    projectId:GCLOUD_PROJECT_ID
})

const configBucket = storage.bucket(process.env.BUCKET_NAME)

const uploadFileToBucket = file => new Promise((resolve,reject)=>{
    
    const { originalname, buffer} = file

    const blob = configBucket.file(originalname.replace(/ /g,'_'))

    const blobStream = blob.createWriteStream({
        resumable:false
    })

    blobStream.on('finish', async () => {
        const publicUrl = `https://storage.cloud.google.com/${configBucket.name}/${blob.name}`
        resolve(publicUrl)
    }).on('error', (error) => {
        console.error(error)
        reject(error,'Failed to upload a file')
    }).end(buffer)
})

module.exports={
    uploadFileToBucket
}