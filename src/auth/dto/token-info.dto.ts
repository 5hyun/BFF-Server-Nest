// src/auth/dto/token-info.dto.ts

/**
 * @description controller와 service에서 공통으로 사용하는 TokenInfo 타입을 정의하고 export 합니다.
 * private한 타입을 public 메서드의 반환 타입으로 사용하여 발생하던 에러를 해결합니다.
 */
export interface TokenInfo {
    grantType: string;
    accessToken: string;
    refreshToken: string;
}