import react, { useState } from 'react';
import M from 'materialize-css'
import { useHistory } from 'react-router-dom'

export const Createpost = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setimage] = useState("")
    const [url, seturl] = useState("")
    const history = useHistory()

    const postDetails=()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","SocialNetwork9")
        data.append("cloud_name","danielalfa98")
        fetch("https://api.cloudinary.com/v1_1/danielalfa98/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json())
        .then(data=>{
            seturl(data.url)
        }).catch(err=>{
            console.log(err);
        })
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(
                {
                    title,
                    body,
                    pic:url
                }
            )
        }).then(res=>res.json()).then(data=>{
            if(data.error){

                M.toast({html:data.error})
            }else{
                M.toast({html:"La publicación fue realizada"})
                history.push("/")
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className= "card input-filed"
        style= {{
            margin: "10px auto",
            maxWidth: "500px",
            padding: "20px",
            textAlign: "center"
        }}>
            
            <input type="text" placeholder= "title" 
                value={title}
                onChange = {(e)=>{
                    setTitle(e.target.value)
                }}
            />
            <input type= "text" placeholder= "Descripción" 
                value={body}
                onChange = {(e)=>{
                    setBody(e.target.value)
                }}
            />
     
     <div class="file-field input-field">
     <div className="btn">
        <span>subir imagen</span>
            <input type="file"
                onChange = {(e)=>{
                    
                    setimage(e.target.files[0])
                }}
            />
        </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
            </div>
            </div>
            <button className="btn waves-effect waves-light"
                onClick= {()=>postDetails()}
            >Publicar</button>
        </div>
    )
}