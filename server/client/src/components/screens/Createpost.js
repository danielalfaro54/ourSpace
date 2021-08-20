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
    
                    M.toast({html:data.error})
                }else{
                    M.toast({html:"La publicación fue realizada"})
                    history.push("/")
                }
            }).catch(err=>{
                console.log(err)
            })
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

    return (
        <div className='mycard'>
        <div className="card auth-card" style={{backgroundColor: '#fbfbfb', width:'23rem', marginTop:'4.5%'}}>
           <h3>Crear publicación</h3>
           <div>
           <MDBInput label="Título" outline style={{backgroundColor: 'white',fontSize:'15px'}}
           maxLength="60"
           type='text'
           value={title}
                onChange = {(e)=>{
                    setTitle(e.target.value)
                }}
           />
           <br/>

           <div class="form-outline">
                <textarea class="form-control" id="textAreaExample" rows="4" placeholder="Descripción"></textarea>
           </div>
           <MDBInput label="Descripción" outline style={{backgroundColor: 'white',fontSize:'15px',height:'5rem'}}
           maxLength="500"
           rows="3"
           type='text'
           value={body}
           onChange = {(e)=>{
               setBody(e.target.value)
           }}
           />
           </div>
        <div class="file-field input-field" style={{display: 'inline-flex', marginTop:'1px', marginBottom:'1px'}}>
            <Button basic color='violet' style={{height:'47px', width:'100px'}}>
            <i class="bi bi-image" style={{marginRight:'4px', marginLeft:'-9px'}}></i>
                Subir imagen
            <input type="file"
                onChange = {(e)=>{  
                    setimage(e.target.files[0])
                }}
            />
             </Button>
            <div className="file-path-wrapper" >
                <input className="file-path validate" type="text"/>
            </div>
            </div>
            <div>
            <br/>
            <Button color='violet' type="submit" name="action"
            style = {{width:'100%', marginBottom:'0.5rem',marginTop:'0.5rem'}}
            onClick= {()=>postDetails()}
                >Publicar
            </Button>
            </div>
        </div>
    </div> 
    )
}