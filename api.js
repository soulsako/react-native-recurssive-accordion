import axios from 'axios';

const CONTENT_EDITOR_URL = (page) => `https://content-v2.cloud.jdplc.com/getContent/apps/app_jdplc/${page}/gb/live`;
//https://content-v2.cloud.jdplc.com/getContent/apps/app_jdplc/${page}/gb/live
//https://jdcontentapiv2.s3.amazonaws.com/content-editor/apps/app_jdplc/stores/content/live/gb/stores.json
const S3_BUCKET_URL = (page) => `https://jdcontentapiv2.s3.amazonaws.com/content-editor/apps/app_jdplc/${page}/content/live/gb/${page}.json`;

class JdApi {

    http(config){

        const url = CONTENT_EDITOR_URL(config.page);
         return axios.get(url)
        .then(res => {
          return res.data.foundPage.content[0].content;
        })
        .catch(error => {
            
          console.log('Content editor down, fetching from S3 bucket instead.', error);
          return this.fetchFromBucket(config);
          
        })
    }

    fetchFromBucket(config){
      //create a cache stamp to append to the end of the JSON URL to essentially clear the cache on the file whenever we make a request to retrieve it
      const ms = 1000 * 60 * 1;
      const cacheStamp = (new Date(Math.round(new Date().getTime() / ms) * ms).getTime());
      const url = S3_BUCKET_URL(config.page);
      const stampUrl = `${url}?c=${cacheStamp}`;

      return axios.get(stampUrl)
      .then(response => {

        console.log(response.data.content[0].content);
        return response.data.content[0].content;
      })
      .catch(error => {
        console.log('Error whilst fetching from S3 bucket', error);
      });
    }
}

export default new JdApi();