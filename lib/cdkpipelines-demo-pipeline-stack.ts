import { Construct, SecretValue, Stack, StackProps } from '@aws-cdk/core';
import { CodePipeline, CodePipelineSource, ShellStep } from "@aws-cdk/pipelines";
export class CdkpipelinesDemoPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      // The pipeline name
      pipelineName: 'MyServicePipeline',

      // How it will be built and synthesized
      synth: new ShellStep('Synth', {
        // Where the source can be found
        input: CodePipelineSource.gitHub('sonuus/cdk-pipelines-infra-typescript4', 'master'),

        // Install dependencies, build and run cdk synth
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ],
      }),
    });

    // This is where we add the application stages
    // ...
  }
}