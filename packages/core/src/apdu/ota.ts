import { executeCommand } from './execute/execute';
import Transport from '../transport';
import { commands } from "./execute/command";
import { target } from '../config/target';
import { CODE } from '../config/status/code';

/**
 * Select Card Manager
 * @return {Promise<boolean>}
 */
export const selectApplet = async (transport: Transport): Promise<boolean> => {
  const appletCommand = 'C1C2C3C4C5';
  const { statusCode } = await executeCommand(transport, commands.SELECT_APPLET, target.SE, appletCommand);
  if (statusCode === CODE._9000) {
    return true;
  }
  return false;


};