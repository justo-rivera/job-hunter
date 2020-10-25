const express = require("express");
const router = express.Router();
const { pool } = require("../dbConfig");

//FETCH GENERAL DATA
const getData = (column, param, selector, res) => {
  console.log(selector);
  //GET VARIABLE NAME FOR DYNAMIC RENDER OF RESULTS (rows or rows[0])
  var name = Object.keys(selector)[0];
  var value = selector[name];
  try {
    pool.query(
      `SELECT * FROM ${column} WHERE ${param} = $1`,
      [value],
      (err, results) => {
        if (err) {
          throw err;
        }
        // console.log(results.rows);
        if (name === "job_id" || column === "preperation") {
          res.status(200).json(results.rows[0]);
        } else {
          //GENERAL
          res.status(200).json(results.rows);
        }
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

//INSERT INTO COLUMN
const insertIntoColumn = (column, data, values, res) => {
  let dynamicValues =[]
   for(let i=0;i<values.length;i++)
{  
    dynamicValues.push(`$${i+1}`)

}  
console.log(dynamicValues)
  try {
    pool.query(
      `INSERT INTO ${column} (${data})
        VALUES (${[...dynamicValues]})
        RETURNING *
        `,
      [...values],
      (err, results) => {
        if (err) {
          throw err;
        }
        // console.log(results.rows[0]);
        res.status(200).json(results.rows[0]);
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

const setRow = (column, row, content, param, id, res) => {
  
  if (content === null || content === true || content === false){
    var set =`SET ${row.map((row)=>{return `${row} = ${content}`})}`

  } else {
    var set =`SET ${row.map((row)=>{return `${row} = '${content}'`})}`
  }
  console.log(set)
  pool.query(
    `
          UPDATE ${column}
          ${set}
          WHERE ${param} = $1
          RETURNING *;
           `,
    [id],
    (err, results) => {
      if (err) {
        throw err;
      }
      if(column === "preperation"){
        console.group("prep")
        res.status(200).json(results.rows[0].interview_questions);

      } else{
 // console.log(results.rows[0]);
 res.status(200).json(results.rows[0]);
      }
     
    }
  );
}
const addToJsonBArray = (column, row, data, param, userName, res) => {
    pool.query(
            `
            UPDATE ${column}
                 SET ${row} = ${row} || ${data}
                 WHERE ${param} = $1
                 RETURNING *;
             `,
            [userName],
            (err, results) => {
              if (err) {
                throw err;
              }
              res.status(200).json(results.rows[0].interview_questions);
            }
          );
}

const addJsonb = (column, row, param, data, jobId, res) => {
  pool.query(
    `
        UPDATE ${column}
         SET ${row} = coalesce(${row}::jsonb,'{}'::jsonb) || '${data}' ::jsonb
        WHERE ${param} = $1
        RETURNING *;
                 `,
    [jobId],
    (err, results) => {
      if (err) {
        throw err;
      }
      // console.log(results.rows);
      res.status(200).json(results.rows);
    }
  );
}


const editJsonB = (column, row, key, value, param, job_id, userName, res ) => {
  pool.query(
    `
          with ${key} as (
            SELECT ('{'||index-1||',${key}}')::text[] as path
              FROM ${column}
                ,jsonb_array_elements(${row}) with ordinality arr(contact, index)
                WHERE contact->>'${param}' = '${job_id}'
                and added_by = $1
          )
          UPDATE ${column}
            set ${row} = jsonb_set(${row}, ${key}.path, '"${value}"')
            FROM ${key}
            WHERE added_by = $1
            RETURNING *;
                   `,
                   [userName],

    (err, results) => {
      if (err) {
        throw err;
      }
      // console.log(results.rows);
      res.status(200).json(results.rows[0]);
    }
  );

}

const removeFromJsonB = (column, row, userName, index, res) => {
  pool.query(
    `UPDATE ${column} 
    SET ${row} = ${row} - ${index} 
    WHERE added_by=$1
    RETURNING *;
    `,
    [userName],

    (err, results) => {
      if (err) {
        throw err;
      }
      // console.log(results.rows);
      res.status(200).json(results.rows);
    }
  );

}

const deleteFromTable = (column, param, id, userName, res) => {
  pool.query(
    `DELETE FROM ${column}
    WHERE ${param} = $1 AND added_by = $2 
    RETURNING *;
  `,
    [id, userName],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results.rows);
    }
  );
};

module.exports = { getData, insertIntoColumn, setRow, addToJsonBArray, addJsonb, editJsonB, removeFromJsonB, deleteFromTable};
