
import React, { forwardRef } from 'react';
import HCaptchaComponent from '@hcaptcha/react-hcaptcha';

interface HCaptchaProps {
  sitekey?: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: (event: string) => void;
  theme?: 'light' | 'dark';
  size?: 'normal' | 'compact' | 'invisible';
}

// Create a forwardRef component
const HCaptcha = forwardRef<HCaptchaComponent, HCaptchaProps>((props, ref) => {
  const { 
    sitekey = "10000000-ffff-ffff-ffff-000000000001", // Demo site key for testing
    onVerify, 
    onExpire = () => {},
    onError = () => {},
    theme = 'light',
    size = 'normal'
  } = props;

  return (
    <div className="hcaptcha-container my-4">
      <div className="flex justify-center items-center w-full">
        <HCaptchaComponent
          sitekey={sitekey}
          onVerify={onVerify}
          onExpire={onExpire}
          onError={onError}
          theme={theme}
          size={size}
          ref={ref}
        />
      </div>
    </div>
  );
});

HCaptcha.displayName = 'HCaptcha';

export default HCaptcha;
