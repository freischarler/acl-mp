import { useState, } from "react";
import { postRegisterUser } from "../services/api";
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Grid, Select, MenuItem, InputLabel  } from '@mui/material';

export const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [born, setBorn] = useState("");
    const [urlImage, setUrlImage] = useState("");
    const [password, setpassword] = useState("");
  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    /*useEffect(() => {
      if (localStorage.getItem("user") === null) {
        navigate(-1)
      }
    }, [navigate]);*/
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const user = {
        name,
        country,
        city,
        address,
        email,
        phone,
        gender,
        born,
        url_image: urlImage,
        password_hash: password,
      };
      addUser(user);
    };
  
    const addUser = (user) => {
      setLoading(true);
      console.log(user)
      postRegisterUser(user)
        .then(res => {
          console.log(res)
          navigate("/")
        })
        .catch(err => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return (
      <Container sx={{ mt: '5%' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                fullWidth
              >
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Fecha de nacimiento</InputLabel>
              <TextField
                type="date"
                value={born}
                onChange={(e) => setBorn(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image URL"
                value={urlImage}
                onChange={(e) => setUrlImage(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                fullWidth
              />
            </Grid>


            <Grid item xs={12}>
                <TextField
                    label="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    fullWidth
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    fullWidth
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    fullWidth
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    label="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    fullWidth
                />
                </Grid>
                <hr />
      
                <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                    Register
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" color="secondary" onClick={() => navigate(-1)} fullWidth>
                    Cancel
                    </Button>
                </Grid>
                </Grid>
          </Grid>
        </form>
      </Container>
    )
}
