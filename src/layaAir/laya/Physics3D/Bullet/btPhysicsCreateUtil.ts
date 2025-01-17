import { Config3D } from "../../../Config3D";
import { Laya3D } from "../../../Laya3D";
import { PhysicsSettings } from "../../d3/physics/PhysicsSettings";
import { IPhysicsCreateUtil } from "../interface/IPhysicsCreateUtil";
import { IMeshColliderShape } from "../interface/Shape/IMeshColliderShape";
import { IPlaneColliderShape } from "../interface/Shape/IPlaneColliderShape";
import { EPhysicsCapable } from "../physicsEnum/EPhycisCapable";
import { btCharacterCollider } from "./Collider/btCharacterCollider";
import { btCollider } from "./Collider/btCollider";
import { btRigidBodyCollider } from "./Collider/btRigidBodyCollider";
import { btStaticCollider } from "./Collider/btStaticCollider";
import { btCustomJoint } from "./Joint/btCustomJoint";
import { btFixedJoint } from "./Joint/btFixedJoint";
import { btHingJoint } from "./Joint/btHingJoint";
import { btSpringJoint } from "./Joint/btSpringJoint";
import { btBoxColliderShape } from "./Shape/btBoxColliderShape";
import { btCapsuleColliderShape } from "./Shape/btCapsuleColliderShape";
import { btConeColliderShape } from "./Shape/btConeColliderShape";
import { btCylinderColliderShape } from "./Shape/btCylinderColliderShape";
import { btSphereColliderShape } from "./Shape/btSphereColliderShape";
import { BulletInteractive } from "./btInteractive";
import { btPhysicsManager } from "./btPhysicsManager";

export class btPhysicsCreateUtil implements IPhysicsCreateUtil {
    // capable map
    protected _physicsEngineCapableMap: Map<any, any>;

    initPhysicsCapable(): void {
        this._physicsEngineCapableMap = new Map();
        this._physicsEngineCapableMap.set(EPhysicsCapable.Physics_Gravity, true);
        this._physicsEngineCapableMap.set(EPhysicsCapable.Physics_StaticCollider, true);
        this._physicsEngineCapableMap.set(EPhysicsCapable.Physics_DynamicCollider, true);
        this._physicsEngineCapableMap.set(EPhysicsCapable.Physics_CharacterCollider, true);
        this._physicsEngineCapableMap.set(EPhysicsCapable.Physics_BoxColliderShape, true);
        this._physicsEngineCapableMap.set(EPhysicsCapable.Physics_SphereColliderShape, true);
        this._physicsEngineCapableMap.set(EPhysicsCapable.Physics_CapsuleColliderShape, true);
        this._physicsEngineCapableMap.set(EPhysicsCapable.Physics_CylinderColliderShape, true);
        this._physicsEngineCapableMap.set(EPhysicsCapable.Physics_ConeColliderShape, true);
        this._physicsEngineCapableMap.set(EPhysicsCapable.Physics_MeshColliderShape, false);
        this._physicsEngineCapableMap.set(EPhysicsCapable.Physics_CompoundColliderShape, false);
    }

    getPhysicsCapable(value: EPhysicsCapable): boolean {
        return this._physicsEngineCapableMap.get(value);
    }

    /**@internal */
    static _bt: any;
    //Bullet init
    initialize(): Promise<void> {
        let physics3D: Function = (window as any).Physics3D;
        physics3D(Math.max(16, Config3D.defaultPhysicsMemory) * 16, new BulletInteractive(null, null)).then(() => {
            //     StaticPlaneColliderShape.__init__();
            // ColliderShape.__init__();
            // CompoundColliderShape.__init__();
            // PhysicsComponent.__init__();
            // PhysicsSimulation.__init__();
            // BoxColliderShape.__init__();
            // CylinderColliderShape.__init__();
            // CharacterController.__init__();
            // Rigidbody3D.__init__();
            btPhysicsCreateUtil._bt = (window as any).Physics3D;
            this.initPhysicsCapable();
            btPhysicsManager.init();
            btCollider.__init__();
            btRigidBodyCollider.__init__();
            btStaticCollider.__init__();
            btCharacterCollider.__init__();
            return Promise.resolve();
        }
        );

        return Promise.resolve();
    }



    createPhysicsManger(physicsSettings: PhysicsSettings): btPhysicsManager {
        return new btPhysicsManager(physicsSettings);
    }

    createDynamicCollider(manager: btPhysicsManager): btRigidBodyCollider {
        return new btRigidBodyCollider(manager);
    }

    createStaticCollider(manager: btPhysicsManager): btStaticCollider {
        return new btStaticCollider(manager);
    }

    createCharacterController(manager: btPhysicsManager): btCharacterCollider {
        return new btCharacterCollider(manager);
    }

    createFixedJoint(manager: btPhysicsManager): btFixedJoint {
        return new btFixedJoint(manager);
    }

    createHingeJoint(manager: btPhysicsManager): btHingJoint {
        return new btHingJoint(manager);
    }

    createSpringJoint(manager: btPhysicsManager): btSpringJoint {
        return new btSpringJoint(manager);
    }

    createCustomJoint(manager: btPhysicsManager): btCustomJoint {
        return new btCustomJoint(manager);
    }

    createBoxColliderShape(): btBoxColliderShape {
        return new btBoxColliderShape();
    }

    createSphereColliderShape(): btSphereColliderShape {
        return new btSphereColliderShape()
    }

    createCapsuleColliderShape(): btCapsuleColliderShape {
        return new btCapsuleColliderShape();
    }

    createMeshColliderShape(): IMeshColliderShape {
        throw new Error("Method not implemented.");
    }

    createPlaneColliderShape(): IPlaneColliderShape {
        throw new Error("Method not implemented.");
    }

    createCylinderColliderShape(): btCylinderColliderShape {
        return new btCylinderColliderShape();
    }

    createConeColliderShape(): btConeColliderShape {
        return new btConeColliderShape();
    }
}


Laya3D.PhysicsCreateUtil = new btPhysicsCreateUtil();