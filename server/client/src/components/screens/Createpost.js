import react, { useEffect, useState } from 'react';
import M from 'materialize-css'
import { useHistory } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { MDBInput } from 'mdbreact';

export const Createpost = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setimage] = useState("")
    const [url, seturl] = useState("")
    const history = useHistory()

    useEffect(() => {
        if(url) {
            uploadFields()
        }
    }, [url])

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
    }

    const uploadFields = () => {
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
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
                M.toast({html:'Completa todos los campos',classes:'#0f0f0f black darken-3'})
            }else{
                M.toast({html:'La publicación fue realizada',classes:'#0f0f0f black darken-3'})
                history.push("/")
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    const PostData = ()=>{
        if(image){
            uploadFields()
        } else{
            uploadFields()
        }
    }

    return (
        <div className='mycard'>
        <div className="card auth-card" style={{backgroundColor: '#fcfcfc', width:'24rem', marginTop:'4.5%'}}>
           <h4  style={{fontWeight: 'bold'}}>Crear publicación</h4>
           <div>
           <MDBInput label="Título" outline style={{backgroundColor: 'white',fontSize:'15px'}}
           maxLength="50"
           type='text'
           value={title}
                onChange = {(e)=>{
                    setTitle(e.target.value)
                }}
           />
           <MDBInput type="textarea" label="Descripción" outline style={{backgroundColor: 'white',fontSize:'15px'}}
           maxLength="400"
           value={body}
           onChange = {(e)=>{
               setBody(e.target.value)
           }}
           />
           </div>
        <div class="file-field input-field" style={{display: 'inline-flex', marginTop:'1px', marginBottom:'1px'}}>
            <Button basic color='violet' style={{height:'47px', width:'89px'}}>
            <i class="bi bi-image" style={{marginRight:'5px', marginLeft:'-9px'}}></i>
                Subir imagen
            <input type="file"
                onChange = {(e)=>{  
                    setimage(e.target.files[0])
                }}
            />
             </Button>
            <div className="file-path-wrapper" >
                <input className="file-path validate" type="text" style={{marginRight:'10px'}}/>
            </div>
            </div>
            <div>
            <br/>
            <Button color='violet' type="submit" name="action"
            style = {{width:'100%', marginBottom:'0.4rem'}}
            onClick= {()=>PostData()}
                >Publicar
            </Button>
            </div>
        </div>
    </div> 
    )
}