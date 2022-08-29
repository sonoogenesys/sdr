/**
 * Created by Nitish on 12/01/21.
 */
import axios from 'axios';
import axiosRetry from 'axios-retry';
// localStorage.debug = 'socket.io-client:socke
const DefaultConfig = {
    retry:{
        noOfAttempts:2,
        interval:1000, // milliseconds
    },
    exception:{
        // Final error message, if there is some error (except network error)
        // For e.g. internal server error etc
            message:'There is some problem while executing your operation. Please try again in a while.'
    },
    setRequests:function setRequests(){
        axiosRetry(axios, { retries: 5, retryDelay: (retryCount = 5) => {
            console.log('retry called')
            return retryCount * 400;
        }});
        axios.interceptors.request.use(
            function(config){
                config.headers.Authorization = config.headers.Authorization || `Bearer ${localStorage.getItem('jwt')}`;

                // After time out the api will be aborted or cancelled
                // config.timeout = 1000;

                // setting params with each request while fetching data
                if(config.method === 'get'){
                    if(!config.params){
                        config.params = {
                            offset: 0
                        }
                    }
                    config.params.limit = config.params.limit || 30;
                }
                return config;
            }
        )
    }
}

export {DefaultConfig}
