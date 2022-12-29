import admin from "firebase-admin";

export const mongoConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const serviceAccount = {
    "type": "service_account",
    "project_id": "ecommerce-backend-b6535",
    "private_key_id": "902d9ffb2649cb036f231b2d04e83f8e347efeab",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9E2QxtNTg5zcC\nLklYL+afoTeVDEaeqfyTeYhvJfVhcDGyOSSi74GfQ5oBCfiF9TVEtUvbv4WowRBk\nTjze/7ozjMbjIZ/i2nU5OjCeYpPaWepAW+Xot7D8ErxWiSuqeH9FBR6wGH755ikz\nWKYwRWrfGYFDDlo6nWCiVxD/yAeMTIbtn2kqz97xcNfGHlpeM8/qhF0NERReDf/A\nGt3mHXAXZmcKIwT89b1C+gHB+RCvcFBwgYArJxRJ8zpsBRwM4efWwHmjqiidgs/Q\nmnfuQUR+JBRkWrqOJyvD053J7Y5ee0s8DunPrdgXw8UfyCQnZ1aPww7Gb9JT+bwK\nnWlgnQ2PAgMBAAECggEAB0YrtfiDCB6ycGm0y1PBx6US16/KjRLKc3ywJwvgI4jc\nIJiE3vqKk29XtBqHbn/p4Ll+MEzEqPgPLWIP2B8hMW0vvvqYMB4UzHLUqViZikOo\no3k69c0Qs2H1JPnPWEDyhIaXO6cgRh+jY3pRn8x2jsa9wQVYVfugBXQxZJB0Lzg2\n28te4evveQZRAiznTL8f6JFhp3MKyDghVTjJhwIZ+WnQ6L2nSrSLMEj90JwpVGb/\nzUmPEIl17Q/apaP4Djb8CCCtY22cWMK6H8b7pruUTLzAXVm3PZcWIkRIQdn9jYD+\nomaH6QR2B/Lnn+5GPFwdRDNm2NszdF/gIXHzuUh0AQKBgQDrXPhw2TvvdvMftPKP\nLlQGU4MPfoNi3xQ+Rk9akIolPNv9V9ndnlb/MLKNCOvjMYnhXJmpoa7vXUU8P50/\n9t2NLK1m8vBAh/2bzse48yjsonEZZda/A+anUV1b2/TATvIqwTsFEZhc8APylJzy\nQC61fsOIIz4xHE3vUN+QrAmDDwKBgQDNp3CurVlPf9wkUdKzVAtytVWNpEdXRheE\nSG/9MgIz4382IOZ1t5SIPfzrjr+LYw/Wv4/xIQoaPom9t5RcvoZcG7hZ43WQQO9z\n7AzhmUt6nkQhF8FiXMypZ0BBk9pFHACm1hbxG5etEXPIgi0kGRKO5MwLJX2LmZ4T\nQkMTRDHNgQKBgQCKy/DW28S0mvkVIahJN5Dliion4PuqOtO9RclWJxbQjutMo5of\nT1kOdLFW6oPxHy2ocOtNVcPL9Lz3oqwhJHvS3R4FMA7uf0PXtkGhmAPySHlZ+OyD\nCNHkqd7cZQIYxnWZMQqVGqM3a3NogqtrUN46ud6lUeNDIuXy00aEEnApkQKBgGwI\n1g0tS4mT5ZW+1i0WrZzo3bS25DNYwunfE9Wy+60+iYlp5ydX9VNNHRyxtLYIqD1s\nDLXjYWdACyP62JmQDQ0+Eq5F63CIbEI9ctbgrOIRWkD4NcLydSFY+Ex622MKvtzm\nAs9Oa3Ojg2uF1yjrcvBWCUqhuz4myP/dA1ePr4oBAoGBAJs+58QdsFRnporTnbAE\n/UCwaZ1x0qTYbC6eT1owEtd24K3KLVWgHjdIFIGZJ4jRz7KJ6a3lxPnLrVOeNGCD\nOxLmxXkueOdS2Y+nqnbTqt+OEEOoK4ayxvCD0QXP+oiY+/ZQew7gc1629hgW/tZh\n0Jm4RwyB8sgDljzbsxjH9z9Z\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-wnz7l@ecommerce-backend-b6535.iam.gserviceaccount.com",
    "client_id": "113470397942304148907",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-wnz7l%40ecommerce-backend-b6535.iam.gserviceaccount.com"
}

export const firebaseConfig = { credential: admin.credential.cert(serviceAccount) };