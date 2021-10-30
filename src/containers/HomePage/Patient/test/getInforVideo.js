import request from 'request'
import cheerio from 'cheerio'


let getSrcVideo = async () => {
    // https://drive.google.com/uc?export=download&id=1ouZCKkmuSVaQ2vTUcs7MzvWNEKn98ane

    // https://drive.google.com/uc?export=download&confirm=K24h&id=1ouZCKkmuSVaQ2vTUcs7MzvWNEKn98ane

    // https://drive.google.com/uc?export=download&confirm=7l7k&id=1ouZCKkmuSVaQ2vTUcs7MzvWNEKn98ane

    // https://drive.google.com/uc?export=download&confirm=MooD&id=1ouZCKkmuSVaQ2vTUcs7MzvWNEKn98ane

    let text = ''

    await request('https://drive.google.com/uc?export=download&id=1ouZCKkmuSVaQ2vTUcs7MzvWNEKn98ane', 
    (error, response, html)=>{
        if(!error && response.statusCode === 200){
            console.log('check response :',response)
            console.log(html)
        }else{
            console.log('looi rtoi', error)
        }
    })

    return text
    
    
}

export default {
    getSrcVideo
}