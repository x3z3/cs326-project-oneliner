import { readFile, writeFile } from 'fs/promises';

class Jsonfs {

    async writeFile(jsonObj, path) {
        try {
            const data = JSON.stringify(jsonObj, null, 2);
            await writeFile(path, data, (err) => {console.log(err)});
            return {status:'success', operation:'write', data:data};
        }
        catch(error) {
            return {status:'error', operation:'write', error:error};
        }
    }

    async readFile(path) {
        try {
            const data = await readFile(path, { encoding:'utf-8' });
            return {status:'success', operation:'read', data:JSON.parse(data)};
        }
        catch(error) {
            // File doesnt exist:
            if (error.errno === -2) {
                return {status:'fileDNE', operation:'read', data:{}};
            }
            return {status:'error', operation:'read', error:error};
        }
    }

}

const jsfs = new Jsonfs();

export { jsfs };