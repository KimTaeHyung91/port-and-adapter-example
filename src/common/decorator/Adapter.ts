import { registerProvider } from '@tsed/di';
import { useDecorators } from '@tsed/core';
import { $log } from '@tsed/common';

export const ADAPTERS: any[] = [];

type AdapterOptions = {
  enabled?: boolean;
  type?: symbol | string | any | symbol[] | string[] | any[];
};

export const Adapter = ({
  enabled = true,
  type,
}: AdapterOptions = {}): ClassDecorator => {
  const addAdapterRegistry = (target: any): void => {
    ADAPTERS.push(target);
  };

  const decorators = [];
  if (Array.isArray(type)) {
    for (const e of type) {
      const registerProviderDecorator = (target: any) => {
        $log.debug(
          `[@Adapter] ${
            typeof e === 'symbol' ? e.toString() : e?.name || e.name
          } points to ${target.name}. Status: ${
            enabled ? 'REGISTERED' : 'NOT REGISTERED'
          }`,
        );

        if (enabled) {
          registerProvider({
            provide: e ?? target,
            useClass: target,
            e,
          });
        }
      };

      decorators.push(registerProviderDecorator);
    }
  } else {
    const registerProviderDecorator = (target: any) => {
      $log.debug(
        `[@Repository] ${
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

    decorators.push(registerProviderDecorator);
  }

  return useDecorators(addAdapterRegistry, ...decorators);
};
