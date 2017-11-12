/// <reference types="node" />
import * as stream from 'stream';
export interface IPTOptions {
    omitWhitespace: boolean;
}
export declare const pt: (pre: string, $options?: Partial<IPTOptions>) => stream.Transform;
export default pt;
