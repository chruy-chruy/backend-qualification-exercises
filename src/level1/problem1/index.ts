export type Value = string | number | boolean | null | undefined |
  Date | Buffer | Map<unknown, unknown> | Set<unknown> |
  Array<Value> | { [key: string]: Value };

/**
 * Transforms JavaScript scalars and objects into JSON
 * compatible objects.
 */
export function serialize(value: Value): unknown {
  if (typeof value == "string" || typeof value == "number" || typeof value == "boolean" || value == null || value == undefined) {
    return value;
  }
  
  else if(value instanceof Map){
    const mapToArray = Array.from(value.entries());
    const obj = 
    {
      "__t": "Map",
      "__v": mapToArray
    }; 

    return obj;
  }
  else if(value instanceof Set){
    const setToArray = Array.from(value);
    const obj = 
    {
      "__t": "Set",
      "__v": setToArray
    }; 

    return obj;
  }
  else if(value instanceof Buffer){
    const bufferToArray = Array.from(value);
    const obj = 
    {
      "__t": "Buffer",
      "__v": bufferToArray
    }; 

    return obj;
  }
  else if(value instanceof Date){
    const dateToTimestamp =  value.getTime()
    const obj = 
    {
      "__t": "Date",
      "__v": dateToTimestamp
    }; 

    return obj;
  }
  
}

/**
 * Transforms JSON compatible scalars and objects into JavaScript
 * scalar and objects.
 */
export function deserialize<T = unknown>(value: unknown): T {
  if (typeof value == "string" || typeof value == "number" || typeof value == "boolean" || value == null || value == undefined) {
    return value as T;
  }
  console.log(value)
  

  
  return;
}
