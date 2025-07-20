export const NUMBERS: string = '0123456789'
export const DEFAULT_OTP_RANGE: number = 6

export const generateOTP = (range: number = DEFAULT_OTP_RANGE): string => {
  let otp: string = ''

  for (let i = 0; i < range; i++) {
    otp += NUMBERS[Math.floor(Math.random() * 10)]
  }

  return otp
}