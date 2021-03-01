import { FileCopyConsumer } from "../consumers/FileCopyConsumer";
import { join, parse } from "path";
import { fdir } from 'fdir';
import fse from 'fs-extra'

export class FileOperator {
  fileConsumer: FileCopyConsumer;
  srcPath: string;
  targetPath: string;
  constructor(srcPath ?: string, targetPath ?: string) {
    this.fileConsumer = new FileCopyConsumer();
    this.srcPath = srcPath ?? join(process.cwd(), 'src');
    this.targetPath = targetPath ?? join(process.cwd(), 'dist');
  }

  async copyFiles() {
    const stats = [];
    const staticFiles = await new fdir() 
      .withFullPaths()   
      .filter(
        (p) =>
          !p.includes('node_modules') &&
          !p.endsWith('.ts') &&
          !p.endsWith('.tsx')
      )
      .crawl(this.srcPath)
      .withPromise() as string[]

    console.log(staticFiles)
    
    await Promise.all(staticFiles.map(file => {
      const targetFilePath = file.replace(this.srcPath, this.targetPath);
      return fse.mkdirp(parse(targetFilePath).dir)
        .then(() => fse.copyFile(file, targetFilePath))
        .then(() => stats.push(`Copied file from [${file}] to [${targetFilePath}]`));
    }))

    this.fileConsumer.onDone({
      kind: "finish",
      payload: stats
    })
  }
}