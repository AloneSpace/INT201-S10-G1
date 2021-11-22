export class CookieUtil {
    static get(name) {
      console.log(`all cookies: ${document.cookie}`);
      let cookieName = `${encodeURIComponent(name)}=`,
        cookieStart = document.cookie.indexOf(cookieName),
        cookieValue = null;
      console.log(`cookieName = ${cookieName}`);
      console.log(`cookieStart = ${cookieStart}`);
  
      if (cookieStart > -1) {
        let cookieEnd = document.cookie.indexOf(';', cookieStart);
        console.log(`cookieEnd = ${cookieEnd}`);
        if (cookieEnd == -1) {
          cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(
          document.cookie.substring(cookieStart + cookieName.length, cookieEnd)
        );
        console.log(`cookieValue = ${cookieValue}`);
      }
  
      return cookieValue;
    }
  
    static set(name, value, expires) {
      let cookieValues = document.cookie.split("favorites=")[1];
      console.log(typeof cookieValues);
      
        let cookieText = "";
        try {
            let values = JSON.parse(cookieValues);
            values.push(value);
            cookieText = `${encodeURIComponent(name)}=${JSON.stringify(
                encodeURIComponent(value)
            )}`;
        } catch (error) {
            cookieText = `${encodeURIComponent(name)}=["${encodeURIComponent(
                value
            )}"]`;
            console.log(error);
        }
        if (expires instanceof Date) {
            cookieText += `; expires=${expires.toUTCString()}`;
        }
        document.cookie = cookieText;
        console.log(`cookieText = ${cookieText}`);
    }
  
    static unset(name) {
      CookieUtil.set(name, '', new Date(0));
    }
  }