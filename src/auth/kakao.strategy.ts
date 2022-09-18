import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-kakao";

export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENTID,
      callbackURL: process.env.KAKAO_CALLBACKURL,
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    console.log(accessToken);
    const profileJson = profile._json;
    const kakao_account = profileJson.kakao_account;
    const payload = {
      name: kakao_account.profile.nickname,
      kakaoId: profileJson.id,
      email:
        kakao_account.has_email && !kakao_account.email_needs_agreement
          ? kakao_account.email
          : null,
    };
    done(null, payload);
  }
}
