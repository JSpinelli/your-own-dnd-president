import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/shared/ApiResponse.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { environment } from 'src/environments/environment';





@Injectable({ providedIn: 'root' })
export class ApiInfo {

    public apiResponse: ApiResponse;

    constructor(private http: HttpClient) {  }

    public async processInfo(imageUri: string, name: string, desc: string, ing: Ingredient[] ) {

        const cloudResponse = await this.cloudVision(imageUri);
        const naturalResponse = await this.naturalLanguage(name, desc, ing);
        this.apiResponse = new ApiResponse(cloudResponse, naturalResponse);
        return this.apiResponse;
    }

    async cloudVision(uri: string): Promise<string> {
        // Creates a client
        const body = {
          requests: [
            {
              features: [
                {
                  type: 'LABEL_DETECTION'
                },
                {
                  type: 'FACE_DETECTION'
                },
                {
                  type: 'SAFE_SEARCH_DETECTION'
                },
                {
                  type: 'WEB_DETECTION'
                }
              ],
              image: {
                source: {
                  imageUri: uri
                }
              }
            }]
        };

        let cloudResponse;
        await this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + environment.VISION_KEY, body).toPromise().then(
            (responseData: any) => {
                cloudResponse = responseData;
            })
        .catch(
            (error) => {
                cloudResponse = error;
            }
        );
        return cloudResponse;
      }

      async naturalLanguage(name: string, desc: string, ing: Ingredient[]) {
        let text: string = name;
        text = text + ' ' + desc;
        for (let index = 0; index < ing.length; index++) {
          const element = ing[index].name;
          text = text + ' ' + element;
        }

        const body = {
          document: {
            type: 'PLAIN_TEXT',
            content: text,
          },
          encodingType: 'UTF8'
        };

        let naturalResponse;
        await this.http.post(
          'https://language.googleapis.com//v1/documents:analyzeSentiment?key=' + environment.VISION_KEY
          , body).toPromise()
            .then(
            (responseData: any) => {
                naturalResponse = responseData;
            })
            .catch(
            (error) => {
                naturalResponse = error;
            });
        return naturalResponse;
      }
}
