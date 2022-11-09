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
      if (typeOfSorting === 'radix') {
        radixSort()
      } else {
        countingSort();
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

  function radixSort() {
    let arr = isRandom ? createRandomArray() : [ ...textArray.split(',') ];
    let comp = 0;
    let changes = 0;
    // Find the max number and multiply it by 10 to get a number
    // with no. of digits of max + 1
    let maxNum = arr[0];
    for (let i = 1; i < arr.length; i++) {
      comp++;
      if(arr[i] > maxNum) {
        changes++;
        maxNum = arr[i];
      }
    }
    maxNum *= 10;

    let divisor = 10;
    const arrays = [];
    arrays.push(arr)
    while (divisor < maxNum) {
      comp++;
      // Create bucket arrays for each of 0-9
      let buckets = [...Array(10)].map(() => []);
      // For each number, get the current significant digit and put it in the respective bucket
      for (let num of arr) {
        buckets[Math.floor((num % divisor) / (divisor / 10))].push(num);
        changes++;
      }
      // Reconstruct the array by concatinating all sub arrays
      arr = [].concat.apply([], buckets);
      // Move to the next significant digit
      divisor *= 10;
    }
    arrays.push(arr);
    setArraysToRender([ ...arrays ]);
    setSortedArray([ ...arr ]);
    setCalculation({ compare: comp, changes: changes });
  }

  const countingSort = () => {
    let arr = isRandom ? createRandomArray() : [ ...textArray.split(',') ];
    let min = arr[0];
    let max = arr[0];
    let comp = 0;
    let changes = 0;
    const arrays = [];
    arrays.push(arr);

    for (let i = 0; i < arr.length; i++) {
      comp++;
      if (min > arr[i]) {
        changes++;
        min = arr[i];
      }
      comp++;
      if (max < arr[i]) {
        changes++;
        max = arr[i];
      }
    }

    const count = {};
    // First populate the count object
    for (let i = min; i <= max; i++) {
      count[i] = 0;
    }
    for (let i = 0; i < arr.length; i++) {
      count[arr[i]] += 1;
    }
    // Then, iterate over count's properties from min to max:
    const sortedArr = [];
    for (let i = min; i <= max; i++) {
      while (count[i] > 0) {
        comp++;
        changes++;
        sortedArr.push(i);
        count[i]--;
      }
    }
    arrays.push(sortedArr)
    setArraysToRender([ ...arrays ]);
    setSortedArray([ ...sortedArr ]);
    setCalculation({ compare: comp, changes: changes });
  };

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
              <option value="radix" name="radix">Radix sort</option>
              <option value="simpleCounting" name="simpleCounting">simple counting</option>
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
