import React, {useState} from 'react';
import TextBox from '../TextBox';

export default function MaskInput({onChangeText, ...props}) {
  const [data, setData] = useState({abonement: ''});

  const onChangeT = text => {
    if (text.length < 20) {
      if (text.length <= 1) {
        setData({
          abonement: '+998 (' + (/^\d+$/.test(text) ? text : ''),
          password: data.password,
        });
      } else if (text.length > 7 && text.length < 9) {
        if (data.abonement.length < text.length) {
          setData({
            abonement: `+998 (${text
              .replace('+998 (', '')
              .replace(') ', '')}) `,
            password: data.password,
          });
        } else {
          setData({
            abonement: text,
            password: data.password,
          });
        }
      } else if (text.length > 8 && text.length < 10) {
        if (data.abonement.length > text.length) {
          setData({
            abonement: text.slice(0, -2),
            password: data.password,
          });
        }
      } else if (text.length > 12 && text.length < 14) {
        if (data.abonement.length < text.length) {
          setData({
            abonement: `+998 (${text.replace('+998 (', '')}-`,
            password: data.password,
          });
        } else if (data.abonement.length > text.length) {
          setData({
            abonement: text.slice(0, -1),
            password: data.password,
          });
        } else {
          setData({
            abonement: text,
            password: data.password,
          });
        }
      } else if (text.length > 15 && text.length < 17) {
        if (data.abonement.length < text.length) {
          setData({
            abonement: `+998 (${text.replace('+998 (', '')}-`,
            password: data.password,
          });
        } else if (data.abonement.length > text.length) {
          setData({
            abonement: text.slice(0, -1),
            password: data.password,
          });
        } else {
          setData({
            abonement: text,
            password: data.password,
          });
        }
      } else {
        setData({
          abonement: text,
          password: data.password,
        });
      }

      if (onChangeText) onChangeText(text);
    }
  };

  return (
    <TextBox
      {...props}
      maxLength={19}
      value={data.abonement}
      onChangeText={onChangeT}
    />
  );
}
