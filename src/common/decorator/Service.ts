import { registerProvider } from '@tsed/di';
import { useDecorators } from '@tsed/core';
import { $log } from '@tsed/common';

export const SERVICES: any[] = [];

type ServiceOptions = {
  enabled?: boolean;
  type?: symbol | string | any;
};

export const Service = ({
  enabled = true,
  type,
}: ServiceOptions = {}): ClassDecorator => {
  const addServiceRegistry = (target: any): void => {
    SERVICES.push(target);
  };

  const registerProviderDecorator = (target: any) => {
    $log.debug(
      `[@Service] ${
        typeof type === 'symbol'
          ? type.toString()
          : typeof type === 'string'
          ? type
          : type?.name || target.name
      } points to ${target.name}. Status: ${
        enabled ? 'REGISTERED' : 'NOT REGISTERED'
      }`,
    );

    if (enabled) {
      registerProvider({
        provide: type ?? target,
        useClass: target,
        type,
      });
    }
  };

  return useDecorators(addServiceRegistry, registerProviderDecorator);
};
