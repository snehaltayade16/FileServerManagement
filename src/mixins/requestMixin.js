export default {
    data() {
        return {
            ERROR_MSG: "Some error encountered",
            BASE_PATH_BACKEND: "https://uat.zygal.io:82/platform_dev_git/zygal/platform/app/mobile/developer_portal/backend/",
            PROFILE_BASE_PATH_BACKEND: "https://uat.zygal.io/platform_dev_git/zygal/platform/app/mobile/v1_dev/backend/src/public/",
            SERVER_PATH: "https://uat.zygal.io/",
            
            requestLoginType: '',
        }
    },
    
    mounted() {
		if (this.$route.path.indexOf("/login") >= 0 || this.$route.path.indexOf("/w/") >= 0)
            this.requestLoginType = 'web';
        else {
            this.requestLoginType = 'mobile';
        }
    },
    methods: {
        async request(url, method = "POST", params = JSON.stringify({}), headers = new Headers()) {
            headers.append("Content-Type", "application/json");
            let requestOptions = {
                method: method,
                headers: headers,
                redirect: 'follow',
                credentials: 'include'
            };

            if (method != "GET")
                requestOptions['body'] = params;

            try {
                let res = await fetch(this.BASE_PATH_BACKEND + url, requestOptions);

                if(!res.ok) {
                    // error message because of user inputs, or any other incorrect matching data
                    if(res.status == 400) {
                        res = await res.json();

                        if(!res.status) {
                            //if not on login page and session has expired
                            if (res.hasOwnProperty("result")) {
                                if (res.result == 1500) {
                                    let currentRoute = this.$route.name;
                                    if (currentRoute != "login") {
                                        if(this.requestLoginType == 'mobile')
                                            this.$router.replace({name: 'login', query: {"error": "SESSION_TIMEOUT"}});
                                        else {
                                            this.$router.replace({name: 'weblogin', query: {"error": "SESSION_TIMEOUT"}});
                                        }
                                    }
                                }
                            }

                            let resp = {"code": 400, "msg": res.msg};
                            if (res.hasOwnProperty("result"))
                                resp["backendCode"] = res.result;

                            if (res.hasOwnProperty("data"))
                                resp["data"] = res.data;

                            return resp;
                        }
                        else {
                            let resp = {"code": 401, "msg": !res.hasOwnProperty("msg") ? this.ERROR_MSG : res.msg};
                            if (res.hasOwnProperty("result"))
                                resp["backendCode"] = res.result;

                            if (res.hasOwnProperty("data"))
                                resp["data"] = res.data;

                            return resp;
                        }
                    }
                    else {
                        let resp = {"code": res.status, "msg": res.hasOwnProperty("statusText") ? res.statusText : this.ERROR_MSG};
                        if (res.hasOwnProperty("result"))
                            resp["backendCode"] = res.result;

                        if (res.hasOwnProperty("data"))
                            resp["data"] = res.data;

                        return resp;
                    }
                }
                else {
                    res = await res.json();

                    if (res.status) {
                        var resp = {"code": 200};

                        if(res.hasOwnProperty("msg"))
                            resp["msg"] = res.msg;

                        if(res.hasOwnProperty("data"))
                            resp["data"] = res.data;

                        if(res.hasOwnProperty("result"))
                            resp["backendCode"] = res.result;
                    }
                    else {
                        if (res.hasOwnProperty("result") && res.result == 1500) {
                            if(this.requestLoginType == 'mobile')
                                this.$router.replace({name: 'login', query: {"error": "SESSION_TIMEOUT"}});
                            else {
                                this.$router.replace({name: 'weblogin', query: {"error": "SESSION_TIMEOUT"}});
                            }
                                
                        }
                        else {
                            var resp = {"code": 500};

                            if(res.hasOwnProperty("msg"))
                                resp["msg"] = res.msg;

                            if(res.hasOwnProperty("result"))
                                resp["backendCode"] = res.result;

                            if (res.hasOwnProperty("data"))
                                resp["data"] = res.data;
                        }
                    }
                    return resp;
                }
            }
            catch (error) {
                return {"code": 402, "msg": this.ERROR_MSG, "error": error};
            }
        },
    }
}