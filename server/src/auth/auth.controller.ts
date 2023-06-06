import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decator";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@ApiTags("auth")
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post("login")
    @Public()
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post("register")
    @Public()
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
}
