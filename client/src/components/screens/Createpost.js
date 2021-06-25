import react from 'react';

export const Createpost = () => {
    return (
        <div className= "card input-filed"
        style= {{
            margin: "10px auto",
            maxWidth: "500px",
            padding: "20px",
            textAlign: "center"
        }}>
            
            <input type="text" placeholder= "title" />
            <input type= "text" placeholder= "Descripción" />
     
     <div class="file-field input-field">
     <div className="btn">
        <span>subir imagen</span>
            <input type="file"/>
        </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
            </div>
            </div>
            <button className="btn waves-effect waves-light">Publicar</button>
        </div>
    )
}