import { Avatar, Button,Grid,  TextField } from "@mui/material"
import { userStyle } from "./JournalFormCss"
import { useState } from "react";
// import logo from '../../../assets//logo.png'
import cart from '../../../assets/cart.png'
import { currentDate, postData } from "../../../services/FetchNodeAdminServices";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
import Header from "../homepage/Header";
import Footer from "../homepage/Footer";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function JournalForm(props)
{
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));


    const [fatherName,setFatherName]=useState('');
    const [name,setName]=useState('');
    const [subject,setSubject]=useState('');
    const [branch ,setBranch ]=useState('');
    const [education,setEducation]=useState('');
    const [link,setLink]=useState('');
    const [paper,setPaper]=useState('');
    const [address,setAddress]=useState('')
    const [abstract,setAbstract]=useState('');
    const [email,setEmail]=useState('');
    const [contact,setContact]=useState('');
    const [photo,setPhoto]=useState({bytes:'',fileName:cart})
   
  

    const [loadingButton,setLoadingButton]=useState(false)
    const [errorMessage,setErrorMessage]=useState({})

    const [selectedOptions, setSelectedOptions] = useState({softCopyINR:false, softCopyUSD:false, softAndHardCopyINR:false});

    const handleCheckboxChange = (event) =>
        {
           const { name, checked } = event.target;
           setSelectedOptions((prevState) => ({ ...prevState, [name]: checked }));
        };
    



    const handleErrorMessage=(label,message)=>{
        var msg=errorMessage;
        msg[label]=message;
        setErrorMessage((prev) => ({ ...prev, ...msg }))

    }


    function resetData()
    {
        setFatherName('')
        setName('');
        setBranch('');
        setSubject('');
        setEducation('');
        setLink('')
        setPaper('');
        setAbstract('');
        setAddress('');
        setEmail('');
        setContact('');
        setPhoto({bytes:"",fileName:cart})
        
    }


    const handlePhoto=(e)=>{
        handleErrorMessage('photo',null)
        try{
        setPhoto({bytes:e.target.files[0],fileName:URL.createObjectURL(e.target.files[0])})
        }
        catch (error) {
            console.log(error.message)  
        }
    
    }



    const handleSubmitData=async()=>{
        var error=validData();
        if(error===false){
     
        setLoadingButton(true)
        var formData=new FormData()
        formData.append('name',name);
        formData.append('fathername',fatherName)
        formData.append('subject',subject);
        formData.append('branch',branch);
        formData.append('education',education);
        formData.append('link',link);
        formData.append('paper',paper);
        formData.append('abstract',abstract);
        formData.append('address',address);
        formData.append('email',email);
        formData.append('contact',contact);
        formData.append('photo',photo.bytes);
        formData.append('created_at', currentDate());
      

            var result = await postData('api/v1/form-for-JournalCertification',formData)
        if(result.status)
        {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Submitt Successfully",
                showConfirmButton: false,
                timer: 2000
              });       
        }
        else
        {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Your work has been not saved",
               showConfirmButton: false,
               timer: 2000
  });

        }
setLoadingButton(false)
resetData()

}
    }


const validData=()=>{
    var err=false;
    if(name.length===0)
        {
            handleErrorMessage('name','plz insert Name...')
             err = true;
        }

            if(fatherName.length===0)
                {
                    handleErrorMessage('fathername','plz insert Father / Husband Name...')
                     err = true;
                }

                if(subject.length===0)
                    {
                        handleErrorMessage('subject','plz insert Subject...')
                         err = true;
                    }            

                        if(education.length===0)
                            {
                                handleErrorMessage('education','plz insert education...')
                                 err = true;
                            }

                            if(link.length===0)
                                {
                                    handleErrorMessage('link','plz insert Link for Publication...')
                                     err = true;
                                }

                                if(paper.length===0)
                                    {
                                        handleErrorMessage('paper','plz insert Paper...')
                                         err = true;
                                    }

                                    if(abstract.length===0)
                                        {
                                            handleErrorMessage('abstract','plz insert Abstract...')
                                             err = true;
                                        }

                                        if(address.length===0)
                                            {
                                                handleErrorMessage('address','plz insert Address...')
                                                 err = true;
                                            }

                                            if(email.length===0)
                                                {
                                                    handleErrorMessage('email','plz insert Email...')
                                                     err = true;
                                                }

                                                if(contact.length===0)
                                                    {
                                                        handleErrorMessage('contact','plz insert Contact...')
                                                         err = true;
                                                    }

                                                            if(photo.bytes===0)
                                                                {
                                                                    handleErrorMessage('photo','plz Upload  photo...')
                                                                     err = true;
                                                                }

                                                               

                                                                
return err;

}



    var classes=userStyle();
    return(<div>
        <div>
            <Header/>

        </div>

        <div style={{background: 'lightgrey',color:'black',width:'100%',height:250,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',marginBottom:40,textAlign:'center'}}> 

           <div style={{fontSize:'2.2rem',fontWeight:500,letterSpacing:1.2}}>FORM FOR JOURNAL CERTIFICATION</div>
           
       </div>
    
         <div className={classes.root}>
        <div className={classes.box}>
           <Grid container spacing={2}>

            <Grid item xs={matches?6:12}>
               <TextField onFocus={()=>handleErrorMessage('name',null)} error={errorMessage?.name} helperText={errorMessage?.name} onChange={(event)=>setName(event.target.value)} label="Name" value={name} fullWidth/>
            </Grid>

            <Grid item xs={matches?6:12}>
                <TextField onFocus={()=>handleErrorMessage('fathername',null)} error={errorMessage?.name} helperText={errorMessage?.name} onChange={(event)=>setFatherName(event.target.value)} label="Name Of father/Husband" value={fatherName} fullWidth/>
            </Grid>

            <Grid item xs={matches?6:12}>
                <TextField onFocus={()=>handleErrorMessage('subject',null)} error={errorMessage?.subject} helperText={errorMessage?.subject} onChange={(event)=>setSubject(event.target.value)} label="Subject* (e.g.: Sociology, Engineering, English)" value={subject} fullWidth/>
            </Grid>

            <Grid item xs={matches?6:12}>
                <TextField onChange={(event)=>setBranch(event.target.value)} label="Branch / field (If any)" value={branch} fullWidth/>
            </Grid>

            <Grid item xs={matches?6:12}>
                <TextField onFocus={()=>handleErrorMessage('education',null)} error={errorMessage?.education} helperText={errorMessage?.education} onChange={(event)=>setEducation(event.target.value)} label="Educational Qualification" value={education} fullWidth/>
            </Grid>

            <Grid item xs={matches?6:12}>
                <TextField onFocus={()=>handleErrorMessage('link',null)} error={errorMessage?.link} helperText={errorMessage?.link} onChange={(event)=>setLink(event.target.value)} label="Link Of Publication" value={link} fullWidth/>
            </Grid>

            <Grid item xs={12}>
                <TextField onFocus={()=>handleErrorMessage('paper',null)} error={errorMessage?.paper} helperText={errorMessage?.paper} onChange={(event)=>setPaper(event.target.value)} label="Title of the paper/Article" value={paper} fullWidth/>
            </Grid>

            <Grid item xs={12}>
                <TextField onFocus={()=>handleErrorMessage('abstract',null)} error={errorMessage?.abstract} helperText={errorMessage?.abstract} onChange={(event)=>setAbstract(event.target.value)} label="Abstract" value={abstract} fullWidth/>
            </Grid>

            <Grid item xs={12}>
                <TextField onFocus={()=>handleErrorMessage('address',null)} error={errorMessage?.address} helperText={errorMessage?.address} onChange={(event)=>setAddress(event.target.value)} label="Address"  value={address} fullWidth/>
            </Grid>

            <Grid item xs={matches?6:12}>
                <TextField onFocus={()=>handleErrorMessage('email',null)} error={errorMessage?.email} helperText={errorMessage?.email} onChange={(event)=>setEmail(event.target.value)} label="Email Id" value={email} fullWidth/>
            </Grid>

            <Grid item xs={matches?6:12}>
                <TextField onFocus={()=>handleErrorMessage('contact',null)} error={errorMessage?.contact} helperText={errorMessage?.contact} onChange={(event)=>setContact(event.target.value)} label="Contact No" value={contact} fullWidth/>
            </Grid>

            <Grid item xs={7}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Button variant="contained" component="label">Photo
                    <input onChange={handlePhoto} type="file" accept="images/*" multiple hidden />
                  </Button>
                  <div>{errorMessage?.photo != null ? errorMessage?.photo : <></>}</div>
           </div>
            </Grid>

            <Grid item xs={5} className={classes.centerStyle}>
                <Avatar src={photo.fileName} variant="rounded"></Avatar>
            </Grid>

            <Grid item xs={12}>
                <FormGroup>
                   <FormControlLabel control={<Checkbox name="softCopyINR" checked={selectedOptions.softCopyINR} onChange={handleCheckboxChange} />} label="I want Soft copy of the certificate @550 INR"/>
                   <FormControlLabel control={<Checkbox name="softCopyUSD" checked={selectedOptions.softCopyUSD} onChange={handleCheckboxChange}/>} label="I want Soft copy of the certificate @ 27 USD (For the authors belong to out of India)"/>
                   <FormControlLabel control={<Checkbox name="softAndHardCopyINR" checked={selectedOptions.softAndHardCopyINR} onChange={handleCheckboxChange} />} label="I want Soft and Hardcopy of the certificate @1250 INR"/>
                </FormGroup>

            </Grid>

            

            <Grid item xs={12}>
                <div style={{fontWeight:400,fontSize:16,letterSpacing:1.2,marginTop:10}}>
               <span style={{fontWeight:'bold',fontSize:18}}>Note :</span> Publication is free for all. Any amount is charged for other further process which include the annual maintenance or issues like of certificate, duplicate certificate with delivery, correction, formatting delivery of print journal etc. 

                    Soft copy will be sent to the registered email ID of the candidate.
                    Hard copy of the certificate will be sent to the registered address of the candidate
                </div>
            </Grid>

            


            <Grid item xs={12} className={classes.centerStyle} style={{marginTop:30}}>
            <LoadingButton
                            loading={loadingButton}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                            onClick={handleSubmitData}
                        >
                            Submit
                        </LoadingButton>
            </Grid>


        </Grid>
        </div>
        </div>

        <div style={{marginTop:30}}>
            <Footer/>
        </div>
    </div>)
}