
import * as React from "react";
import { useEffect, useState } from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";

export const TitleEditor = (props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [classes, setClasses]= useState([])
  
  useEffect(()=>{
    localStorage.removeItem("id_classe")
    localStorage.removeItem("id_salle")
    localStorage.removeItem("id_enseignant")
    localStorage.removeItem("id_matiere")

  },[])

  useEffect(() => {
      if (!isLoaded) {
          fetch("http://localhost:4000/classes").then(response =>
              response.json()
          ).then(data => {
              setClasses(data)
              setIsLoaded(true)
          }).catch(err => {
              console.log(err)
          })
      }
      
  })

  const handleChange = (event) => {
    if (props.onChange) {
      props.onChange.call(undefined, {
        value: event.value._id,
      });
      localStorage.setItem("id_classe", event.value._id)
    }
  };

  return (
    <DropDownList
      onChange={handleChange}
      value={classes.find((p) => p._id === props.value)}
      data={classes}
      dataItemKey={"_id"}
      textField={"nom"}
    />
  );
};

export const MatiereEditor = (props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [matieres, setMatieres]= useState([])
  const [id, setId] = useState()
  
  useEffect(()=>{
    setId(localStorage.getItem("id_classe"))
    setIsLoaded(false)
  }, localStorage.getItem('id_classe'))

  useEffect(() => {
    if (localStorage.getItem('id_classe')){
      if (!isLoaded) {
          fetch(`http://localhost:4000/classes/${localStorage.getItem('id_classe')}/matieres`).then(response =>
              response.json()
          ).then(data => {
              setMatieres(data)
              setIsLoaded(true)
              console.log({"matieres":matieres})

          }).catch(err => {
              console.log(err)
          })
      }
   } },[id])
  
  const handleChange = (event) => {
    if (props.onChange) {
      props.onChange.call(undefined, {
        value: event.value._id,
      });
      localStorage.setItem("id_matiere", event.value._id)
    }
  };

  return (
    <DropDownList
      onChange={handleChange}
      value={matieres.find((t) => t._id === props.value)}
      data={matieres}
      dataItemKey={"_id"}
      textField={"libele"}
    />
  );
};

export const EnseignantEditor = (props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [enseignants, setEnseignants]= useState([])
  const [id, setId] = useState()
  
  useEffect(()=>{
    setId(localStorage.getItem("id_classe"))
    setIsLoaded(false)
    setEnseignants([])
  }, [localStorage.getItem('id_classe')])

  useEffect(() => {
    if ((localStorage.getItem('id_classe'))&&(localStorage.getItem("id_matiere"))){
      setIsLoaded(false)
      if (!isLoaded) {
          fetch(`http://localhost:4000/affectation/${localStorage.getItem('id_classe')}/${localStorage.getItem("id_matiere")}`).then(response =>
              response.json()
          ).then(data => {
            console.log("done")
              setEnseignants([...enseignants,data.enseignant])
              setIsLoaded(true)
              console.log({"enseignant":enseignants})

          }).catch(err => {
              console.log(err)
          })
      }
   } },[localStorage.getItem("id_matiere"),localStorage.getItem["id_classe"]])
   console.log({"enseignant":enseignants})

  const handleChange = (event) => {
    if (props.onChange) {
      props.onChange.call(undefined, {
        value: event.value._id,
      });
      localStorage.setItem("id_enseignant", event.value._id)
    }
  };

  return (
    <DropDownList
      onChange={handleChange}
      data={enseignants}     
      dataItemKey={"_id"}
      textField={"prénom"}
    />
  );
};

export const RoomEditor = (props) => {
  const [sallesLoaded, setSallesLoaded]= useState(false)
  const [ salles, setSalles ] = useState([])

  useEffect(async() => {
    if (!sallesLoaded) {
        await fetch("http://localhost:4000/salles").then(response =>
            response.json()
        ).then(data => {
            setSalles(data)
            setSallesLoaded(true)
            console.log(salles)
        }).catch(err => {
            console.log(err)
        })
    }
})

  const handleChange = (event) => {
    if (props.onChange) {
      props.onChange.call(undefined, {
        value: event.value.id,
      });
      localStorage.setItem("id_salle", event.value._id)
    }
  };

  return (
    <DropDownList
      onChange={handleChange}
      value={salles.find((r) => r.id === props.value)}
      data={salles}
      dataItemKey={"id"}
      textField={"title"}
    />
  );
};

