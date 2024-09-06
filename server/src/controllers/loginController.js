import userService from '../services/userService.js';

class LoginController {
    async postLogin(req, res, next) {
        try {
            //console.log(req.body)
            const { email, password } = req.body;
            

            // Validate the email and password
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }
        
            // Find the user in your database
            const user = await userService.findUserByEmail(email);
        
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
        
            // Check the password
            const isPasswordValid = await userService.checkUserPassword(user, password);
        
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }
        
            // The user is logged in
            res.json({ message: 'Logged in successfully' });
        } catch (error) {
            //console.log(error)
            next(error);
        }
    }

    async getLoginUserByEmail(req, res, next) {
        try {
            const email = req.params.email;
            
            // Validate the email and password
            if (!email) {
                return res.status(400).json({ message: 'Email and password are required' });
            }
        
            // Find the user in your database
            const user = await userService.getUserByEmail(email);
        
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
        
    
            // The user is logged in
            res.json(user);
        } catch (error) {
            console.log(error.message)
            next(error);
        }
    }
}

export default new LoginController();