
export class ApiResponse {

    public imageResponse: {
        error: string,
        labels: [{
            description: string,
            score: number
        }],
        faces: [{
            joy: string,
            sorrow: string,
            anger: string,
            surprise: string,
            headwear: string,
        }],
        safe: {
            adult: string,
            spoof: string,
            medical: string,
            violence: string,
            racy: string,
        },
        web: {
            entities: [{
                entityId: string,
                score: number,
                description: string
            }],
            fullMatchingImages: [{
                url: string,
                score: number
            }]
        }
    } = {
        error: '',
        labels: [],
        faces: [],
        safe: {
            adult: '',
            spoof: '',
            medical: '',
            violence: '',
            racy: '',
        },
        web: {
            entities: [],
            fullMatchingImages: [],
        }
    };

    public naturalResponse: {
        documentSentiment: {
            magnitude: number,
            score: number
        },
        language: string,
        sentences: [
            {
                text: {
                    content: string,
                    beginOffset: number
                  },
                sentiment: {
                    magnitude: number,
                    score: number
                }
            }
        ]
    } = {
        documentSentiment: {
            magnitude: 0,
            score: 0
        },
        language: '',
        sentences: []
    };

    constructor(imageRes: any, naturalRes: any) {
        if (imageRes.responses[0].hasOwnProperty('error')) {
            this.imageResponse.error = 'It seems there was an error retrieving information';
        } else {
            const labels = imageRes.responses[0].labelAnnotations;
            const faces = imageRes.responses[0].faceAnnotations;
            const safe = imageRes.responses[0].safeSearchAnnotation;
            const web = imageRes.responses[0].webDetection;
            labels.forEach(label => {
                this.imageResponse.labels.push({
                    description: label.description,
                    score: label.score
                });
            });
            if (faces) {
                faces.forEach(face => {
                    this.imageResponse.faces.push({
                        joy: face.joyLikelihood,
                        sorrow: face.sorrowLikelihood,
                        anger: face.angerLikelihood,
                        surprise: face.surpriseLikelihood,
                        headwear: face.headwearLikelihood
                    });
                });
            } else {
                this.imageResponse.faces = null;
            }
            this.imageResponse.safe.adult = safe.adult;
            this.imageResponse.safe.spoof = safe.spoof;
            this.imageResponse.safe.medical = safe.medical;
            this.imageResponse.safe.violence = safe.violence;
            this.imageResponse.safe.racy = safe.racy;
            if (web) {
                web.webEntities.forEach(webEnt => {
                    this.imageResponse.web.entities.push({
                        ...webEnt
                    });
                });
                web.fullMatchingImages.forEach(images => {
                    this.imageResponse.web.fullMatchingImages.push({
                        ...images
                    });
                });
            } else {
                this.imageResponse.web = null;
            }
        }
        this.naturalResponse =  naturalRes;
    }
}
