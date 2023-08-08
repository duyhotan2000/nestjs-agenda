import { Logger, type FactoryProvider } from "@nestjs/common";
import type { AgendaModuleOptions } from "./interfaces";
import { AgendaService } from "./agenda.service";
import { MODULE_OPTIONS_TOKEN } from "./agenda.module-definition";

export const createAgendaServiceProvider = (): FactoryProvider => {
  return {
    provide: AgendaService,
    useFactory: async (options: AgendaModuleOptions) => {
      const logger = new Logger(createAgendaServiceProvider.name);
      const agendaService = new AgendaService(options);
      if(options.enabled) {
        await agendaService.start();
      } else {
        logger.log("Agenda disabled...")
      }
      return agendaService;
    },
    inject: [MODULE_OPTIONS_TOKEN],
  };
};
