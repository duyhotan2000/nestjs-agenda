import { Logger, type FactoryProvider } from "@nestjs/common";
import type { AgendaModuleOptions } from "./interfaces";
import { AgendaService } from "./agenda.service";
import { MODULE_OPTIONS_TOKEN } from "./agenda.module-definition";

export const createAgendaServiceProvider = (): FactoryProvider => {
  return {
    provide: AgendaService,
    useFactory: async (options: AgendaModuleOptions) => {
      const logger = new Logger(createAgendaServiceProvider.name);
      if(options.enabled) {
        const agendaService = new AgendaService(options);
        await agendaService.start();
        return agendaService;
      } else {
        logger.log("Agenda disabled...")
      }
    },
    inject: [MODULE_OPTIONS_TOKEN],
  };
};
