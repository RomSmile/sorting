import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import ShowArrays from '../components/showArrays';

export default function Home() {
  const [ isRandom, setIsRandom ] = useState(false);
  const [ lengthRandomArr, setLengthRandomArr ] = useState(0);
  const [ calculation, setCalculation ] = useState({
    compare: 0,
    changes: 0
  });
  const [ sortedArray, setSortedArray ] = useState([]);
  const [ arraysToRender, setArraysToRender ] = useState([]);
  const [ typeOfSorting, setTypeOfSorting ] = useState('');
  const [ textArray, setTextArray ] = useState('')

  const checkboxHandleChange = () => {
    setIsRandom(!isRandom)
    setTextArray('');
  };

  const getArray = () => {
    if (typeOfSorting) {
      if (typeOfSorting === 'bubble') {
        bubble();
      } else {
        simpleChoose();
      }
    }
  }

  const changeArrayLength = (ev) => {
    if (isRandom) {
      setLengthRandomArr(ev.target.value)
    } else {
      return;
    }
  }

  const inputHandleChange = (ev) => {
    if (!isRandom) {
      setTextArray(ev.target.value);
    } else {
      return;
    }
  }

  const createRandomArray = () => {
    const arr = [];

    for (let i = 0; i < lengthRandomArr; i++) {
      arr[i] = Math.floor(Math.random() * (lengthRandomArr + 1));
    }

    return arr;
  }

  const bubble = () => {
    const arr = isRandom ? createRandomArray() : [ ...textArray.split(',') ];
    let comp = 0;
    let chan = 0;
    const arrays = [];
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        comp++;
        if (arr[j] > arr[j+1]) {
          chan++;
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
      arrays.push([ ...arr ]);
    }

    setArraysToRender([ ...arrays ]);
    setSortedArray([ ...arr ]);
    setCalculation({ compare: comp, changes: chan });
  }

  const simpleChoose = () => {
    const arr = isRandom ? createRandomArray() : [ ...textArray.split(',') ];
    const arrays = [];
    let comp = 0;
    let chan = 0;
    for (let i = 1; i < arr.length; i++) {
      for (let j = i; j > 0; j--) {
        comp += 1;
        if (arr[j] < arr[j - 1]) {
          chan++;
          let temp = arr[j];
          arr[j] = arr[j - 1];
          arr[j - 1] = temp;
        } else {
          break;
        }
      }
      arrays.push([ ...arr ]);
    }

    setArraysToRender([ ...arrays ]);
    setSortedArray([ ...arr ]);
    setCalculation({ compare: comp, changes: chan });
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Sorting array</a>
        </h1>

        <p className={styles.description}>
          Get started by
          <code className={styles.code}>Enter the array </code>
        </p>

        <div className={styles.form}>
          <label>
            <p>Create array with random integers</p>
            <input
              type="checkbox"
              checked={isRandom}
              onChange={checkboxHandleChange}
            />
          </label>
          <label>
            <p>Enter numbers separated by commas</p>
            <input
              type="text"
              disabled={isRandom}
              onChange={inputHandleChange}
            />
          </label>
          <label>
            <p>Select method to sort</p>
            <select
              onChange={(ev) => setTypeOfSorting(ev.target.value)}
            >
              <option value="" >Select type of sorting</option>
              <option value="bubble" name="bubble">bubble</option>
              <option value="simpleChoose" name="simpleChoose">simple choose</option>
            </select>
          </label>
          <label>
            <p>Array from random integers length</p>
            <input
              type="number"
              min={0}
              max={100}
              value={lengthRandomArr}
              disabled={!isRandom}
              onChange={changeArrayLength}
            />
          </label>
          <button onClick={getArray}>set sorting</button>
        </div>

        {sortedArray.length > 0 ? 
          <ShowArrays arrays={arraysToRender} calculation={calculation} />
          : ''
        }

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
