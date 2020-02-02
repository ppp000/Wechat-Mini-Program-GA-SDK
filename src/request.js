import Logger from './log'
import _default from './config'
const Log = new Logger(_default)
class Request {
  constructor(){

  }


  webRequest(option){
    //let {url,method,data} = option
    // object to params?
      window.option = option
      if (String(option) !== '[object Object]') return undefined
      option.method = option.method ? option.method.toUpperCase() : 'POST'
      option.data = option.data || {}
      var formData = []
      for (var key in option.data) {
        formData.push(''.concat(key, '=', option.data[key]))
      }
      option.data = formData.join('&')

      if (option.method === 'GET') {
        option.getUrl= option.url + "?" + option.data
      }
      let {transferResponse} = option

      console.log(option)
      var xhr = new XMLHttpRequest()
      xhr.responseType = option.responseType || 'json'
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            if(transferResponse)
            {
              console.log(xhr.response)
              Log.enqueue({
                url:option.url?option.url:option.getUrl,
                data:option.data,
                res:option.validateHit ? transferResponse(xhr.response): xhr.status,
                //transferResponse(xhr.response)
              })
              if(!!option.onSuccess){
                option.onSuccess(option)
              }

                //delete option.transferRespons
                //transferResponse = (res)=> res


            }else{
              Log.enqueue({
                url:option.url?option.url:option.getUrl,
                data:option.data,
                res:option.validateHit ? xhr.response : xhr.status,
              })
              if(!!option.onSuccess){
                option.onSuccess(option)
              }

            }
          } else {
              //this.fail()
              Log.enqueue({
                error:"Error",
                url:option.url?option.url:option.getUrl,
                res:option.validateHit ? xhr.response : "Error"
                //data:option.data,
                //transferResponse(xhr.response)
              })
              if(!!option.onError){
              option.onError(option)
              }


          }
        }
      }
      if(option.method == "GET"){
        xhr.open(option.method, option.getUrl, true)
        xhr.send()
      }

      if (option.method === 'POST') {
        xhr.open(option.method, option.url, true)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(option.data)
      }

      //console.loh(t)
    }


weRequest(options){
   console.log("test on wechat")
}
isonWechat(){
  return typeof wx == 'object'? true : false
}

send(options){
  if(this.isonWechat()){
    return this.weRequest(options)
  }
  return this.webRequest(options)

}

}

export default Request
