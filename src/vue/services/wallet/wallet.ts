import { Handler, default as mitt } from 'mitt';
import { BaseProvider } from '@/services/wallet/providers/base-provider';
import { MetamaskProvider } from '@/services/wallet/providers/metamask-provider';
import { ReaderProvider } from '@/services/wallet/providers/reader-provider';
import { WalletConnectProvider } from '@/services/wallet/providers/walletconnect-provider';
import { WalletStoreState, useBattleStore, useWalletStore } from '@/stores';
import { markRaw, watch } from 'vue';
import { InitWalletconnectModal } from '~/blockchainWC';
import { UniversalProvider } from './providers/universal-provider';

let walletInstance: WalletService | null = null

export class WalletService {
  account = '';
  connected = false;
  installed = false;
  currency = 'plasma';
  provider: BaseProvider = new ReaderProvider();
  emmiter = mitt()

  constructor() {
    walletInstance = this
    InitWalletconnectModal()
  }

  get state(): WalletStoreState {
    return {
      account: this.account,
      connected: this.connected,
      installed: this.installed,
    }
  }

  async connect(provider: 'metamask' | 'walletconnect' | 'telegram' | 'local') {
    if (provider === 'metamask') {
      // this.provider = new MetamaskProvider()
      this.provider = new UniversalProvider()
    }

    if (provider === 'walletconnect') {
      // this.provider = new WalletConnectProvider()
      this.provider = new UniversalProvider()
    }

    if (provider === 'telegram' || provider === 'local') {
      this.provider = new UniversalProvider()
    }

    if (!this.provider) {
      throw new Error('provider not defined')
    }

    useBattleStore().rewards.setBoxesIds(
      await this.provider.getUserBoxesToOpen()
    );

    return this.updateState((await this.provider.connect()).value);
  }

  private updateState(account: string | null) {
    this.installed = account !== null;

    if (!account) {
      this.emmiter.emit('state', this.state)

      return false;
    }

    this.connected = true;
    this.account = account;
    this.emmiter.emit('state', this.state)

    return true;
  }

  on(type: string, handler: Handler<unknown>) {
    this.emmiter.on(type, handler)
  }

  openPopup() {
    return new Promise(resolve => {
      const store = useWalletStore()

      const unwatch = watch(() => store.popup, () => {
        if (!store.popup) {
          resolve(this.state)
          unwatch()
        }
      })

      store.openPopup()
    })
  }

  static getWalletInstance() {
    return walletInstance || new WalletService()
  }

  static VuePlugin = {
    install: app => {
      app.config.globalProperties.$wallet = markRaw(WalletService.getWalletInstance());
    }
  };

  static StorePlugin = () => ({
    wallet: markRaw(WalletService.getWalletInstance())
  });
}

export const useWallet = () => WalletService.getWalletInstance()
