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
  else if (typeof value === "object" && '__t' in value && '__v' in value) {
    // Deserialize the Json object if it has '__t' and '__v' properties
  if(value.__t == "Map" && Array.isArray(value.__v)){
    const map = new Map();
    for (const [key,val] of value.__v){
      map.set(key,val);
    }
    return map as T;
  }
  else if(value.__t == "Set" && Array.isArray(value.__v)){
    const set = new Set(value.__v);
    
    return set as T;
  }
  else if(value.__t == "Buffer" && Array.isArray(value.__v)){
    const buffer = Buffer.from(value.__v);
    return buffer as T;
  }

  else if(value.__t == "Date" && typeof value.__v == 'number'){
    const date = new Date(value.__v);
    return date as T;
  }
}

}
