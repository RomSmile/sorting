import React from "react";

export default function ShowArrays({ arrays, calculation }) {
  console.log(arrays);
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflowX: 'scroll',
      maxWidth: '1100px',
      width: '100%',
      marginTop: '30px',
      paddingBottom: '30px',
    }}>
      {arrays.map((item, index1) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
          key={index1}
        >
          {item.map((number , index2) => (
            <div
              style={{
                padding: '10px',
                textAlign: 'center',
              }}
              key={index2}
            >{number}</div>
          ))}
        </div>
      ))}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          width: '100%',
        }}
      >
        <div>
          compare - {calculation.compare}
        </div>
        <div>
          changes - {calculation.changes}
        </div>
      </div>
    </div>
  );
}